const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const noteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// This plugin adds an auto-incrementing 'ticket' field to the schema,
// starting at 500. It uses 'ticketNums' as the counter ID for tracking.
noteSchema.plugin(AutoIncrement, {
    inc_field: "ticket",
    id: "tickenNums",
    start_seq: 500,
});

module.exports = mongoose.model("Note", noteSchema);
