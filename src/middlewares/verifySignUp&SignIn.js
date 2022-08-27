const User = require("../models/user.model");
const Company = require('../models/company.model');
const constants = require("../utils/constants")

const validateSignUpRequestBody = async (req, res, next) => {

    
    if (!req.body.name) {
        return res.status(400).send({
            message: "Failed ! User name is not provided"
        })
    }

    
    if (!req.body.userId) {
        return res.status(400).send({
            message: "Failed ! UserId is not provided"
        })
    }
    try {
        const user = await User.findOne({ userId: req.body.userId });
        if (user != null) {
            return res.status(400).send({
                message: "Failed ! UserId is already taken"
            })
        }
    } catch (err) {

        return res.status(500).send({
            message: "Internal server error while validating the request"
        })
    }

    if (!req.body.companyId) {
        return res.status(400).send({
            message: "Failed ! companyId is not provided"
        })
    }
    try {
        const company = await Company.findOne({ userId: req.body.companyId });
        if (!company) {
            return res.status(400).send({
                message: "Failed ! company is not present"
            })
        }
    } catch (err) {

        return res.status(500).send({
            message: "Internal server error while validating the request"
        })
    }

    if (!req.body.password) {
        return res.status(400).send({
            message: "Failed ! Password is not provided"
        })
    }

    
    if (!req.body.email) {
        return res.status(400).send({
            message: "Failed ! Email is not provided"
        })
    }

    const isValidEmail = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

    if (!isValidEmail(req.body.email)) {
        return res.status(400).send({
            message: "Failed ! Not a valid email id"
        })
    }

    const userTypes = [constants.userTypes.applicant, constants.userTypes.hr ];
    
    if(req.body.userType){
        if(req.body.userType == constants.userTypes.admin){
            return res.status(400).send({
                message : "ADMIN registartion is not allowed"
            }) 
        }
        if(!userTypes.includes(req.body.userType)){
            return res.status(400).send({
                message : "UserType provided is not correct. Possible correct values : CUSTOMER | ENGINEER"
            })
        }
    }

    next(); 
}


const validateSignInRequestBody = (req, res, next) => {

    if (!req.body.userId) {
        return res.status(400).send({
            message: "Failed ! UserId is not provided"
        })
    }

    if (!req.body.password) {
        return res.status(400).send({
            message: "Failed ! Password is not provided"
        })
    }

next();
}
 
 
const verifyRequestBodiesForAuth = {
    validateSignUpRequestBody : validateSignUpRequestBody ,
    validateSignInRequestBody : validateSignInRequestBody
};
 
module.exports = verifyRequestBodiesForAuth
 
