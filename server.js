const express = require('express');
const bodyParser = require('body-parser');
const User = require("./models/user.model");

const app = express();

const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config")

const bcrypt = require("bcryptjs");

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
    //init();
});
db.once("open", async() => {
    // CREATE USER
    await User.collection.drop();
    const user = await User.create({
        fname: "tilak",
        lname: "Chandra",
        userId: "admin",
        password: bcrypt.hashSync("Welcome1", 8),
        email: "tilakc4343@gmail.com",
        userType: "ADMIN"
    });
    console.log(user);
    // CREATE JOBS
    await Jobs.collection.drop();
    const job = await Jobs.create({
        title: 'Backend Developer',
        description: 'Create a backend application',
        postedBy: user._id,
        companyName: 'ABC'

    });

    // CREATE Companies
    await companies.collection.drop();
    const Company = await companies.create({
        companyName: 'ABC',
        companyEmail: "abcde@gmail.com",
        password: bcrypt.hashSync("Asus@7409", 8),
        description: 'ABC Job',
        jobs: [job._id],
        email: 'abc@abc.com',
    });
    console.log(Company);
    console.log("Connected to mongoDB");

})

app.listen(serverConfig.PORT, () => {
    console.log("Mongo db connected successfully");
    console.log("Server Started Successsfully")
    console.log("Started the server on the PORT number : ", serverConfig.PORT);
});