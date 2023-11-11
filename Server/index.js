require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");

connection();


app.use(express.json());
app.use(cors());

app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on ${port}...`);
});