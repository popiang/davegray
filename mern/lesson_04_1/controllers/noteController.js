const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");

// @desc Get all notes
// @route GET /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find().lean();

    if (!notes.length) {
        return res.status(400).json({ message: "No notes found" });
    }

    res.json(notes);
});

// @desc Create new note
// @route POST /notes
// @access Private
const createNewNote = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body;

    if (!user || !title || !text) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const checkUser = await User.findById(user);

    if (!checkUser) {
        return res
            .status(400)
            .json({ message: "User for the note is not found" });
    }

    const noteObject = {
        user,
        title,
        text,
    };

    const newNote = await Note.create(noteObject);

    if (newNote) {
        res.status(200).json({ message: "Note successfully created" });
    } else {
        res.status(400).json({ message: "Invalid note data received" });
    }
});

// @desc Update a note
// @route PATCH /notes
// @access Private
const updateNote = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body;

    if (!id || !user || !title || !text || typeof completed !== "boolean") {
        return res.status(400).json({ message: "All fields are required" });
    }

    const noteToUpdate = await Note.findById(id).exec();

    if (!noteToUpdate) {
        return res.status(400).json({ message: "Note not found" });
    }

    const checkUserExists = await User.findById(user).lean().exec();

    if (!checkUserExists) {
        return res
            .status(400)
            .json({ message: "User for the note is not found" });
    }

    noteToUpdate.user = user;
    noteToUpdate.title = title;
    noteToUpdate.text = text;
    noteToUpdate.completed = completed;

    const updatedNote = await noteToUpdate.save();

    res.status(200).json({ message: "Note successfully updated" });
});

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Note ID is required" });
    }

    const noteToDelete = await Note.findById(id).exec();

    if (!noteToDelete) {
        return res.status(400).json({ message: "Note to delete is not found" });
    }

    await noteToDelete.deleteOne();

    const reply = `Note with ID ${id} has been successfully deleted`;

    res.json({ message: reply });
});

module.exports = { getAllNotes, createNewNote, updateNote, deleteNote };
