/**
 * This is going to be the starting point of the application
 */
const express = require('express');
const app = express();
const serverConfig = require('./configs/server.config');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");
const User = require("./models/user.model");
const Job = require("./models/job.model");
const Company = require("./models/company.model");

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
    console.log("Error while connecting to MongoDB");
});
db.once("open", () => {
    console.log("Connected to mongoDB");
    //init();
});

/**
 * Create the ADMIN user at the boot time
 */
async function init() {

    /**
     * Check if the admin user is already present
     */
    try {

        /**
         * Every time the server starts the collection should be refreshed
         *
         */

        await User.collection.drop();
        await Job.collection.drop();
        await Company.collection.drop();

        /**let user = await User.findOne({ userId: "admin" });
 
        if (user) {
            console.log("ADMIN user is already present");
            return;
        }**/

        const user = await User.create({
            name: "Himanshu",
            userId: "admin",
            password: bcrypt.hashSync("Welcome1", 8),
            email: "himanshu.gusain007@gmail.com",
            userType: "ADMIN"
        });

        const job = await Job.create({
            title: "SDE-L1",
            description: "We are in dire need of self motivated backend developer",


        });

        const company = await Company.create({
            name: "Amazon",
            country: "India",
            location: "Noida"

        });

        console.log("User Collection: \n", user);
        console.log("Job Collection: \n", job);
        console.log("Company Collection: \n", company);
    } catch (err) {
        console.log("err in db initialization , " + err.message);
    }

}


/**
 * So this can be used for the integration testing
 */
module.exports = app.listen(serverConfig.PORT, () => {
    init();
    console.log("Started the server on the PORT number : ", serverConfig.PORT);
});