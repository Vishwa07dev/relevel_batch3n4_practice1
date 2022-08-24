const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const bcrypt=require("bcryptjs");
const serverconfig=require("./configs/server.config");
const DBConfig=require("./configs/db.config");
const User=require("./models/user.models");
const Company=require("./models/company.models");
const Job=require("./models/job.models");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(DBConfig.DB)
const db=mongoose.connection;

db.on("err",()=>{
    console.log("Error")
});
db.once("open",()=>{
    console.log("Connected..");
    init();
});

async function init()
{
    try
    {
            await User.collection.drop();
            await Company.collection.drop();
            await Job.collection.drop();

            const user=await User.create({
                name:"Sandeep",
                email:"san@gmail.com",
                password:bcrypt.hashSync("Welcome1",8),
                userType:"ADMIN"
            });
            const job=await Job.create({
                jobname:"javascript",
                catageory:"IT",
                description:"we work on backend where all work happen",
                vacancies:3
            });
            const company=await Company.create({
                companyname:"Infosys",
                description:"IT Solution Company",
                address:"jay prakash nagar,kharodi village ,marve road,malad(w)",
                email:"info@gmail.com",
                password:bcrypt.hashSync("welcome1",8)
            });
        
            console.log(user)
            console.log(company)
            console.log(job)
    }
    catch(err){
        console.log("Error in initialization in DB",err.message);
    }
}


module.exports=app.listen(serverconfig.PORT,()=>{
    console.log("I am Listening At:",serverconfig.PORT);
})