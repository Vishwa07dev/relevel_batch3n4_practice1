const express = require('express'); 
const bodyParser = require('body-parser');
//const User = require("./models/user.model");

const app = express();

const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config")

const bcrypt = require("bcryptjs");
/**
 * Register the body-parser middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/**
 * Initialize the connection to the mongoDB
 */
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
    console.log("Error while connecting to monogoDB ")
});
db.once("open", () => {
    console.log("Connected to mongoDB");
    init();
});


/**
 *  We need to connect router to the server
 * 
 */

app.listen(serverConfig.PORT, () => {
    console.log("Mongo db connected successfully");
    console.log("Server Started Successsfully")
    console.log("Started the server on the PORT number : ", serverConfig.PORT);
