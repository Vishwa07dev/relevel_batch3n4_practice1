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
        //await user.collection.drop();

        const user1=await User.create({
            name:"Mand3",
            email:"mandeep.com",
            userid:"3",
            password:"Hie",
            usertype:"HR",
            userstatus:"Pending"
        });
        const user2=await User.create({
            name:"Mand4",
            email:"mandeep1.com",
            userid:"4",
            password:"Hie",
            usertype:"HR",
            userstatus:"Pending"
        });
        const user3=await User.create({
            name:"Mand5",
            email:"Mandee2.com",
            userid:"5",
            password:"Hie",
            usertype:"HR",
            userstatus:"Pending"
        });
        const job1= await jobs.create({
            jobId:1,
            jobType:"Softwareengineer1"
        })
        const job2= await jobs.create({
            jobId:2,
            jobType:"Softwareengineer2"
        })
        const comapny1=await company.create({
            companyId:"1",
            hiringfor:"Softwareengineer1",
            jobdescription:"This is hiring for se1"
        })
        const comapny2=await company.create({
            companyId:"2",
            hiringfor:"Softwareengineer2",
            jobdescription:"This is hiring for se1"
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
