const Note = require("../models/Note");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find().lean();

    if (!notes) {
        return res.status(400).json({ message: "No notes found" });
    }

    res.json(notes);
});

const createNote = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body;

    if (!user || !title || !text) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const noteUser = await User.findById(user).lean().exec();

    if (!noteUser) {
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
        res.status(200).json(newNote);
    } else {
        res.status(400).json({ message: "Invalid note data provided" });
    }
});

const updateNote = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body;

    if (!id || !user || !title || !text || typeof completed !== "boolean") {
        return res.status(400).json({ message: "All fields are required" });
    }

    const note = await Note.findById(id).exec();

    if (!note) {
        return res.status(400).json({ message: "Note not found" });
    }

    const noteUser = await User.findById(user).lean().exec();

    if (!noteUser) {
        return res
            .status(400)
            .json({ message: "User for the not is not found" });
    }

    note.user = user;
    note.title = title;
    note.text = text;
    note.completed = completed;

    const updatedNote = await note.save();

    if (updatedNote) {
        res.status(200).json(updatedNote);
    } else {
        res.status(400).json({ message: "Invalid note data provided" });
    }
});

const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Note ID is required" });
    }

    const note = await Note.findById(id).exec();

    if (!note) {
        return res.status(400).json({ message: "Note not found" });
    }

    await note.deleteOne();

    const reply = `Note with ID ${id} has been deleted`;

    res.json({ message: reply });
});

module.exports = { getAllNotes, createNote, updateNote, deleteNote };
