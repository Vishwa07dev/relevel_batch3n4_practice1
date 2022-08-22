const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");
const {userModel, jobModel, companyModel} = require("./models/index");

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

db.on("error", () => {
    console.log("error occured while connection to the db.");
})
db.once("open", ()=> {
    console.log("connected to the mongodb.");
    initSeedData();
})

async function initSeedData(){
    try {
        await userModel.collection.drop();
        await jobModel.collection.drop();
        await companyModel.collection.drop();
        
        const user1 = await userModel.create({
            username : "user1",
            userId : "u1",
            password : bcrypt.hashSync("userpassword", 8),
            email : "user1@gmail.com",
        });

        const job1 = await jobModel.create({
            jobTitle : "SDE",
        })

        const company1 = await companyModel.create({
            companyname : "Relevel"
        })
    }
    catch(err){
        console.log("error while initialising the database with data.", err);
    }
}

module.exports = app.listen(serverConfig.PORT, () => {
    console.log("listening at port : ", serverConfig.PORT);
})