const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3500;
const app = express();
const { logger, logEvents } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
require("dotenv").config();
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");

console.log(process.env.NODE_ENVIRONMENT);

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/users", require("./routes/userRoute"));
app.use("/notes", require("./routes/noteRoute"));

app.use((req, res, next) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({ message: "404 Not Found" });
    } else {
        res.type("txt").send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
    console.log("Database is connected..");
    app.listen(PORT, () => {
        console.log(`App is running on port ${PORT}`);
    });
});

mongoose.connection.on("error", (error) => {
    console.log(error);
    logEvents(
        `${error.name}\t${error.message}\t${error.code}\t${error.codeName}`,
        "mongErrLog.log"
    );
});
