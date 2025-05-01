const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().lean();

    if (!users?.length) {
        res.status(400).json({ message: "No users found" });
    }

    res.json(users);
});

// @desc Create a new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body;

    if (!username || !password || !Array.isArray(roles) || !roles?.length) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const checkDuplicate = await User.findOne({ username }).lean().exec();

    if (checkDuplicate) {
        return res.status(400).json({ message: "Duplicate username" });
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
        res.status(400).json({ message: "Invalid user's data provided" });
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
        return res.status(400).json({ message: "User not found" });
    }

    const checkDulicate = await User.findOne({ username }).lean().exec();

    if (checkDulicate && checkDulicate._id.toString() !== id) {
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
        res.status(200).json({ message: `${updatedUser.username} updated` });
    } else {
        res.status(400).json({ message: "Invalid user's data provided" });
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

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const checkUserNote = await Note.findOne({ user: id }).lean().exec();

    if (checkUserNote) {
        return res.status(400).json({ message: "User has assigned notes" });
    }

    await user.deleteOne();

    const reply = `User with ID ${id} has been deleted`;

    res.json({ message: reply });
});

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser };
