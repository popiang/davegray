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
            required: [true, "Title is required"],
        },
        text: {
            type: String,
            required: [true, "Text is required"],
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

noteSchema.plugin(AutoIncrement, {
    inc_field: "ticket",
    id: "ticketNums",
    start_req: 500,
});

module.exports = mongoose.model("Note", noteSchema);
