const User = require('../models/user.model');
const constants = require('../utils/constants');
const Company = require('../models/company.model');

const validateSignUpRequestBody = async (req, res, next)=>{

    if(!req.body.name){
        res.status(400).send({
            message : "Failed ! User name is not provided"
        });
        return;
    }
    if(!req.body.userId){
        res.status(400).send({
            message : "Failed ! userId is not provided"
        });
        return;
    }
    if(!req.body.email){
        res.status(400).send({
            message : "Failed ! email is not provided"
        });
        return;
    }
    if(!isValidEmail(req.body.email)){
        res.status(400).send({
            message : "Failed ! Not a valid email id"
        });
        return;
    }
    if(!req.body.password){
        res.status(400).send({
            message : "Failed ! password is not provided"
        });
        return;
    }
    if(!req.body.userType){
        res.status(400).send({
            message : "Failed ! userType is not provided"
        });
        return;
    }
    if(req.body.userType == constants.userTypes.admin){
        res.status(400).send({
            message : "ADMIN registartion is not allowed"
        })
    }
    const userType = [constants.userTypes.applicant, constants.userTypes.hr]

    if(!userType.includes(req.body.userType)){
        res.status(400).send({
            message : "UserType provided is not correct value:  `APPLICANT` || `HR` "
        })
    }
    if(req.body.companyId && req.body.userType != constants.userTypes.hr){
        res.status(400).send({
            message : "provide the HR type"
        })
    }
    if(req.body.companyId){
        const company = await Company.findOne({_id : req.body.companyId});
        if(company == null){
            res.status(400).send({
            message : "Company is not Present !"
        })
    }}
    
    next();
}

const isValidEmail = (email)=>{
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const validateSignInRequestBody = (req, res, next) =>{

    if(!req.body.userId){
        return res.status(400).send({
            message : "Failed ! UserId is not provided"
        })
    }

    if(!req.body.password){
        return res.status(400).send({
            message : "Failed ! Password is not provided"
        })
    }

    next();
}

const verifyRequestBodyForAuth = {
    validateSignUpRequestBody,
    validateSignInRequestBody
}

module.exports = verifyRequestBodyForAuth