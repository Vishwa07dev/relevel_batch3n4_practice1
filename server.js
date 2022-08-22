const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");
const {userModel, jobModel, companyModel} = require("./models/index");



mongoose.connect(dbConfig.DB_URL);  // mongoose connection
const db = mongoose.connection;

db.on("error", () => {
    console.log("error occured while connection to the db.");
})
db.once("open", ()=> {
    console.log("connected to the mongodb.");
    require("./utils/initialDummyData")(userModel, jobModel, companyModel, bcrypt); // inserting dummy data to the the db
})



module.exports = app.listen(serverConfig.PORT, () => {
    console.log("listening at port : ", serverConfig.PORT);
})