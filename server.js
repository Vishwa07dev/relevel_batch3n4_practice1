const express = require('express');
const app = express();
const serverConfig = require('./configs/server.config');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dbConfig = require("./configs/db.config");
const User = require("./models/user.model");
const Hr = require("./models/hr.model");
const Job = require("./models/job.model");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
    console.log("Error while connecting to MongoDB");
});
db.once("open", () => {
    console.log("Connected to mongoDB");
    //init();
});

async function init(){
    try{
        await User.collection.drop();
        await Job.collection.drop();
        await Hr.collection.drop();

        const hr = await Hr.create({
            name: "PAvan",
            userId: "hr",
            phone: "555-9990",
            email:"pavankumar1@gmail.com",
            password: bcrypt.hashSync("Welcome1", 8)
        });

        const job = await Job.create({
            name: "BackendDeveloper",
            userId: "job",
            description: "Need candidate who's good in Rest api's, node.js, express, sql, mongoDB ..."
        });

        const user = User.create({
            name: "PAvanUser",
            userId: "user",
            phone: "555-9999",
            email:"pavankumaruser1@gmail.com",
            password: bcrypt.hashSync("Welcome2", 8)
        });

    } catch(err){
        console.log("err in db initialization , " + err.message);
    }
}

module.exports = app.listen(serverConfig.PORT, () => {
    console.log("Started the server on the PORT number : ", serverConfig.PORT);
});