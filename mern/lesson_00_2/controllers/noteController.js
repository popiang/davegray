const Note = require("../models/Note");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc Get all notes
// @routes GET /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find().lean();

    if (!notes?.length) {
        return res.status(400).json({ message: "No notes found" });
    }

    res.status(200).json(notes);
});

// @desc Create a new note
// @routes POST /notes
// @access Private
const createNewNote = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body;

    if (!user || !title || !text) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const checkUserNote = await User.findById(user).lean().exec();

    if (!checkUserNote) {
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

// @desc Update a note
// @routes PATCH /notes
// @access Private
const updateNote = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body;

    if (!id || !user || !title || !text || typeof completed !== "boolean") {
        return res.status(400).json({ message: "All fields are required" });
    }

    const note = await Note.findById(id).exec();

    if (!note) {
        return res.status(400).json({ message: "Note not found" });
    }

    const userFoNote = await User.findById(user).lean().exec();

    if (!userFoNote) {
        return res
            .status(400)
            .json({ message: "User for the note is not found" });
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

// @desc Delete a note
// @routes DELETE /notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }

    const noteToDelete = await Note.findById(id).exec();

    if (!noteToDelete) {
        return res.status(400).json({ message: "Note to delete is not found" });
    }

    await noteToDelete.deleteOne();

    const reply = `Note with ID ${id} has successfully been deleted`;

    res.status(200).json({ message: reply });
});

module.exports = { getAllNotes, createNewNote, updateNote, deleteNote };
