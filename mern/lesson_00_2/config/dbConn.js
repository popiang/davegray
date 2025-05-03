const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
		console.log("Database successfully connected");
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;
