const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");

router
    .route("/")
    .get(noteController.getAllNotes)
    .post(noteController.createNewNote)
    .patch(noteController.udpateNote)
    .delete(noteController.deleteNote);

module.exports = router;
