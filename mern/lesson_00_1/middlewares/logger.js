const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        // check first if the logs directory exists, if it doesn't we'll create one
        if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
            await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
        }

        // get the file and append a new line of entry(logItem)
        await fsPromises.appendFile(
            path.join(__dirname, "..", "logs", logFileName),
            logItem
        );
    } catch (error) {
        console.log(error);
    }
};

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
    console.log(`${req.method} ${req.path}`);
    next();
};

module.exports = { logEvents, logger };
