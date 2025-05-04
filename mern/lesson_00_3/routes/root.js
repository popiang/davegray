const express = require("express");
const router = express.Router();
const path = require("path");

// it seems that express 5.0 and above doesn't accept below regex
// router.get("^/$|/index(.html)?", (req, res) => {
//     res.sendFile(path.join(__dirname, "..", "views", "index.html"));
// });

router.get(/^\/$|\/index(.html)?$/, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
