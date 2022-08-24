const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const bcrypt = require('bcryptjs')


const serverConfig = require('./configs/serverConfig')
const User = require('./models/user.model');
const Job = require('./models/job.model');
const Company = require('./models/company.model');
const constants = require('./utils/constants')


// connectiong with mongoDB
mongoose.connect(serverConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
    console.log("Error While connecting with mongoDB")
})
db.once("open", () => {
    console.log("Connection Established with mongoDB")
    init()
})

async function init(){
    try{
        await User.collection.drop()
        await Company.collection.drop()
        await Job.collection.drop()
    
        let  user = await User.findOne({userType : constants.userType.admin});
        if(user){
            console.log(user);
            console.log("Admin user is already created")
            return
        }
    
        user = await User.create({
            name : "Dipankar Bhoumik",
            userId : "dipu01",
            password : bcrypt.hashSync("dipu97", 10),
            email : "bhoumik.dipu@gmail.com",
            userType : constants.userType.admin,
        })

        const jobObj = {
            title : "This is a new Job",
            description : "abc"
        }

        const job = await Job.create(jobObj)

        const companyObj = {
            name : "xyz",
            description : "hello this is a company",
        }

        const company = await Company.create(companyObj)



    
        console.log(user);
        console.log(job);
        console.log(company);

    }catch(err){
        console.log("Error while inserting data into database manually : ", err.message)
    }
};




module.exports = app.listen(serverConfig.PORT, () => {
    console.log("Server is runing ar PORT : " + serverConfig.PORT)
})
