require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const adminServicesRoute = require("./routes/adminServices");
const employeeServicesRoute = require("./routes/employeeServices");
const testRoute = require("./routes/test");

connection();


app.use(express.json());
app.use(cors());

app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);
app.use("/api/admin", adminServicesRoute);
app.use("/api", employeeServicesRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on ${port}...`);
});