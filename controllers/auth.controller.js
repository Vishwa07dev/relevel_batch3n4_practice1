/*

Users : 
    1. Applicant
        - Should be able to register

    2. Admin
        - Should be able to create only from the backend and not from the API

    3. HR
        - Should be able to register


*/
const constants = require("../utils/constants");
const User = require("../models/user.model");
const authConfig = require("../configs/auth.config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.singup = async (req, res) => {
    try {
        if(req.body.userType == constants.userTypes.hr){
            req.body.userStatus = constants.userStatuses.pending;
        }

        const userObj = {
            name : req.body.name,
            email : req.body.email,
            userId : req.body.userId,
            password : bcrypt.hashSync(req.body.password, 8),
            userType : req.body.userType,
            userStatus : req.body.userStatus,
            jobsApplied : req.body.jobsApplied,
            companyId : req.body.companyId
        }

        const userCreated = await User.create   (userObj);
        const customizedResponse = {
            name : req.body.name,
            email : req.body.email,
            userId : req.body.userId,
            userType : req.body.userType,
            userStatus : req.body.userStatus,
            jobsApplied : req.body.jobsApplied,
            companyId : req.body.companyId
        }

        res.status(200).send(customizedResponse);
    }
    catch(err){
        res.status(500).send({
            message : `The error is : ${err.message}`
        })
    }
}


exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({userId : req.body.userId});
        if(!user){
            return res.status(400).send({
                message : "You dont have account in Naukri. Please create one to apply for the job."
            })
        }
        if(user.userStatus == constants.userStatuses.pending){
            return res.status(400).send({
                message : "You need approval to post the job or to update the existing job post."
            })
        }

        const isValidPassword = bcrypt.compareSync(req.body.password, user.password);
        if(!isValidPassword){
            return res.status(401).send({
                message : "You have entered the wrong password."
            })
        }

        const token = jwt.sign({id : user.userId}, authConfig.secretKey, {expiresIn : 600});

        res.status(200).send({
            name : user.name,
            email : user.email,
            userId : user.userId,
            userType : user.userType,
            userStatus : user.userStatus,
            accessToken : token
        })
    }
    catch(err){
        return res.status(500).send({
            message : "Internal error while signing in."
        })
    }
}