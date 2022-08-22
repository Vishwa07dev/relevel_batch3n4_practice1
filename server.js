/** Starting point of the aplication */

const express = require('express');
const app = express();
const serverConfig = require('./config/server.config');
const mongoose = require("mongoose");
const User = require("./model/user.model");
const bcrypt = require("bcryptjs");




/**
 * Intitialize the connection to the mongoDm
 */
 mongoose.connect(serverConfig.DB_URL);
 const db = mongoose.connection;
 db.on("error",()=>{
    console.log("Error while connecting to MongoDB");
 });
 db.once("open",()=>{
    console.log("Connected to mongoDB");
    init();
 })
/**
 * create the ADMIN user at the boot time
 */
async function init(){
    /**Check if the user admin is alredy present */
try{
    await User.collection.drop(); // This line drop the collection every time so tha t line 37 to 42 is not required

   const  user =  await User.create({
        name:"pancham",
        userId:"admin",
        password:"Welcome1",
        email:"panchamku8873@gmail.com",
        password:bcrypt.hashSync("Welcome1",8),
        userType:"ADMIN"
    })
    
    console.log(user);
}catch(err){
    console.log("error in admin creation ", err.message);
}
}



/**
 * So this can be used for the integration testing
 */
module.exports = app.listen(serverConfig.PORT, ()=>{
    console.log("Started the server on the port number : " ,serverConfig.PORT)
})