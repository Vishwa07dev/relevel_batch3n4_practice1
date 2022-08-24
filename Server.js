const express=require("express")
const app=express()
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User=require("./Models/user.models")
const jobs=require("./Models/job")
const config=require("./Config/mongo")
const user = require("./Utils/user");
const company=require("./Models/company")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(config.url);
const db = mongoose.connection;
db.on("error", () => {
    console.log("Error while connecting to MongoDB");
});
db.once("open", () => {
    console.log("Connected to mongoDB");
    initial();
});
async function initial(){
    try{
        await db.db.dropCollection("users");

        const user1=await User.create({
            name:"Mand3",
            email:"mandeep.com",
            userid:"3",
            password:"Hie",
            usertype:"HR"
        });
        const user2=await User.create({
            name:"Mand4",
            email:"mandeep1.com",
            userid:"4",
            password:"Hie",
            usertype:"HR"
        });
        const user3=await User.create({
            name:"Mand5",
            email:"Mandee2.com",
            userid:"5",
            password:"Hie",
            usertype:"HR"
        });
        const job1= await jobs.create({
            title:"Se1",
            Description:"This is for Se1"
        })
        const job2= await jobs.create({
            title:"Se1",
            Description:"This is for Se1"
        })
        const comapny1=await company.create({
            CompanyName:"Your Fav Company",
            Description:"Opening for SE1 ",
            email:"Yourfavcomany@gmail.com"
        })
        const comapny2=await company.create({
            CompanyName:"Your Fav Company 2",
            Description:"Opening for SE2 ",
            email:"Yourfavcomany2@gmail.com"
        })

        console.log(user1)
        console.log(user2)
        console.log(user3)
        console.log(job1)
        console.log(job2)
        console.log(comapny1)
        console.log(comapny2)
    }
    catch(err){
        console.log("There is an error in initialize catch",err)
    }
}
