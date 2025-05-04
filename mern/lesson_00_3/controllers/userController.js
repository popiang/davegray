const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().lean();

    if (!users) {
        return res.status(400).json({ message: "No users found" });
    }

    res.status(200).json(users);
});

// @desc Create a new user
// @route POSTS /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body;

    if (!username || !password || !Array.isArray(roles) || !roles?.length) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const checkDuplicate = await User.findOne({ username }).lean().exec();

    if (checkDuplicate) {
        return res.status(409).json({ message: "Duplicate username" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userObject = {
        username,
        password: hashedPassword,
        roles,
    };

    const newUser = await User.create(userObject);

    if (newUser) {
        res.status(200).json(newUser);
    } else {
        res.status(400).json({ message: "Invalid user data provided" });
    }
});

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, password, roles, active } = req.body;

    if (
        !id ||
        !username ||
        !Array.isArray(roles) ||
        !roles?.length ||
        typeof active !== "boolean"
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: "User to update is not found" });
    }

    const checkDuplicateUsername = await User.findOne({ username })
        .lean()
        .exec();

    if (
        checkDuplicateUsername &&
        checkDuplicateUsername._id.toString() !== id
    ) {
        return res.status(400).json({ message: "Duplicate username" });
    }

    user.username = username;
    user.roles = roles;
    user.active = active;

    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();

    if (updatedUser) {
        res.status(200).json({
            message: `User with ID ${updatedUser._id} updated`,
        });
    } else {
        res.status(400).json({ message: "Invalid user data provided" });
    }
});

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }

    const userToDelete = await User.findById(id).exec();

    if (!userToDelete) {
        return res.status(400).json({ message: "User to delete is not found" });
    }

    await userToDelete.deleteOne();

    const reply = `User with ID ${id} has been deleted`;

    res.status(200).json({ message: reply });
});

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser };
