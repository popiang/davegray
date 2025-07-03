const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3500;
const app = express();

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));

app.all

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
