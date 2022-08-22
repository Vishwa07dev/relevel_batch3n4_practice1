/**
 * This is going to be the starting point of the application
 */
 const express = require('express');
 const app = express();
 const serverConfig = require('./configs/sever.config');
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
     init();
 });
 
 /**
  * Create the ADMIN user at the boot time
  */
 async function init() {
 
     /**
      * Check if the admin user is already present
      */
     try {
 
         //await User.collection.drop();
         

 
 
         const user = await User.create({
             name: "lakshya",
             userId: "admin",
             password: bcrypt.hashSync("Welcome1", 8),
             email: "lakshya@gmail.com",
             userType: "ADMIN"
         });
         
         
        
         //await Company.collection.drop();
         const company = await Job.create({
            name: "AMAZON",
            companyId: "111",
            details: "AWS",
            companyJObIDs: [101],
             
         });
 
         //await Job.collection.drop();
         const job = await Job.create({
             title: "SDE2",
             JobId: "101",
             details: "Js backend engineer",
             email: "lakshya@gmail.com",
             companyAffliatedTO: "111"
         });
 
         console.log(user);
     } catch (err) {
         console.log("err in db initialization , " + err.message);
         console.log(err)
     }
 
 }
 
 
 
 
 
 /**
  * So this can be used for the integration testing
  */
 module.exports = app.listen(serverConfig.PORT, () => {
     console.log("Started the server on the PORT number : ", serverConfig.PORT);
 });