const { logEvents } = require("./logger");

const errorHandler = (err, areq, res, next) => {
	// log error to errLog.log first
    logEvents(
        `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
        "errLog.log"
    );

    console.log(err.stack);

	// send the error response
    const status = res.statusCode ? res.statusCode : 500; // server error
    res.status(status);
    res.json({ message: err.message });
};

module.exports = errorHandler;
