const express=require("express");
const app=express()
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const bcrypt=require("bcryptjs")
const serverconfig=require("./configs/server.config");
const DBConfig=require("./configs/db.config")
const User=require("./models/user.models")
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


            const user=await User.create({
                name:"Sandeep",
                email:"san@gmail.com",
                password:bcrypt.hashSync("Welcome1",8),
                userType:"ADMIN"
            });
            console.log(user)
    }
    catch(err){
        console.log("Error in initialization in DB",err.message);
    }
}


app.listen(serverconfig.PORT,()=>{
    console.log("I am Listening At:",serverconfig.PORT);
})