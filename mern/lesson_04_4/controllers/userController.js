const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}, "-password").lean();

    if (!users?.length) {
        return res.status(400).json({ message: "Users not found" });
    }

    res.json(users);
});

const createUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body;

    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const checkDuplicate = await User.findOne({ username }).lean().exec();

    if (checkDuplicate) {
        return res.status(400).json({ message: "Duplicate username" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userObject = { username, password: hashedPassword, roles };

    const newUser = await User.create(userObject);

    if (!newUser) {
        return res.status(400).json({ message: "Invalid user data provided" });
    }

	res.json(newUser);
});

const updateUser = asyncHandler(async (req, res) => {
    const { id, username, password, roles, active } = req.body;

    if (
        !id ||
        !username ||
        !Array.isArray(roles) ||
        !roles.length ||
        typeof active !== "boolean"
    ) {
        return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const checkDuplicate = await User.findOne({ username }).lean().exec();

    if (checkDuplicate && checkDuplicate._id.toString() !== id) {
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
        res.status(200).json(updatedUser);
    } else {
        res.status(400).json({ message: "Invalid user data provided" });
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(id).exec();

    if (!user) {
        res.status(400).json({ message: "User not found" });
    }

    await user.deleteOne();

    const reply = `Username ${user.username} with ID ${id} has been deleted`;

    res.json({ message: reply });
});

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
