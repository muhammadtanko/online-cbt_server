require("dotenv").config();
require("./connection/mongo.conn")();

const userRoutes = require("./routes/user.routes");
const { appPort } = require("./config")
const express = require("express");
const cors = require("cors")
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/user", userRoutes());


app.listen(appPort, () => {
    console.log("App listening on port " + appPort);
})