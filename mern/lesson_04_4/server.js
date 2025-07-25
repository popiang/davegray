const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3500;
const { logger, logEvents } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
require("dotenv").config();
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const app = express();

console.log(process.env.NODE_ENV);

connectDB();

app.use(cookieParser());

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/users", require("./routes/userRoutes"));
app.use("/notes", require("./routes/noteRoutes"));

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
    console.log("Connected to database..");
    app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
    console.log(err);
    logEvents(
        `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
        "mongErrLog.log"
    );
});
