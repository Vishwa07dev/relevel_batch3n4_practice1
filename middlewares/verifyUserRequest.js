require('dotenv').config();
const User = require('../models/user.model')
const Company = require('../models/company.model')
const constants = require('../utils/constants')

const isValidEmail = (email)=>{ // checks valid email format
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const isValidPassword = (password)=>{ // checks password meets requirements
    return password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{10,25}$/);
}


const validateSignUpRequestBody = async (req,res,next)=>{
    try{
        if(!req.body.name){
            return res.status(400).send({
                message : "Failed! User's name is not provided"
            });
        }
    
        if(!req.body.username){
            return res.status(400).send({
                message : "Failed! Username is not provided"
            });
        }
    
        try{
            const user = await User.findOne({username: req.body.username});
    
            if(user!=null){
                return res.status(400).send({
                    message : "Failed! username is already taken"
                });
            }
        }catch(err){
            return res.status(500).send({
                message : "Internal server error while validating the sign-up request"
            });
        }
    
        if(!req.body.password){
            return res.status(400).send({
                message : "Failed! Password is not provided"
            });
        }
    
        if(!isValidPassword(req.body.password)){
            return res.status(400).send({
                message : "Failed! Not a valid password. Password must be 10 to 25 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
            });
        }
    
        if(!req.body.email){
            return res.status(400).send({
                message : "Failed! Email is not provided"
            });
        }
    
        if(!isValidEmail(req.body.email)){
            return res.status(400).send({
                message : "Failed! Not a valid email id"
            });
        }
    
        if(!req.body.userType){
            return res.status(400).send({
                message : "Failed! User type is not provided"
            });
        }
    
        if(req.body.userType == constants.userTypes.admin){
            return res.status(400).send({
                message : "ADMIN registration is not allowed"
            });
        }
    
        const userTypes = [constants.userTypes.applicant, constants.userTypes.hr];
    
        if(!userTypes.includes(req.body.userType)){
            return res.status(400).send({
                message : "UserType provided is not correct. Possible correct values : APPLICANT | HR"
            });
        }

        if(req.body.userType == constants.userTypes.hr){
            if(!req.body.companyId){
                return res.status(400).send({
                    message : "CompanyId is required for HR registration"
                });
            }else{
                const company = await Company.findOne({_id: req.body.companyId});
                if(!company){
                    return res.status(400).send({
                        message : "CompanyId provided does not match with any company"
                    });
                }
                req.company = company
            }
        }
    
        next();

    }catch{
        console.log("#### Error while validating sign-up request body ##### ", err.message);
        res.status(500).send({
            message : "Internal server error while sign-up validation"
        });
    }
}

const validateSignInRequestBody = (req, res, next) => {
    if (!req.body.username) {
        return res.status(400).send({
            message: "Failed ! Username is not provided"
        })
    }

    if (!req.body.password) {
        return res.status(400).send({
            message: "Failed ! Password is not provided"
        })
    }

    next();
}


const validateNewPassword = (req,res,next)=>{

    if(!req.body.password){
        return res.status(400).send({
            message : "Failed! Password is not provided"
        });
    }

    if(!isValidPassword(req.body.password)){
        return res.status(400).send({
            message : "Failed! Not a valid password. Password must be 10 to 25 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
        });
    }

    next();
}


const validateUserUpdateBody = (req,res,next)=>{

    const userTypes = [constants.userTypes.applicant,constants.userTypes.hr,constants.userTypes.admin]
    const userStatuses = [constants.userStatuses.approved,constants.userStatuses.pending,constants.userStatuses.rejected]

    if(req.body.password && !isValidPassword(req.body.password)){
        return res.status(400).send({
            message : "Failed! Not a valid password. Password must be 10 to 25 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
        });
    }

    if(req.body.userType && !userTypes.includes(req.body.userType)){
        return res.status(400).send({
            message : "UserType provided is not correct."
        });
    }

    if(req.body.userStatus && !userStatuses.includes(req.body.userStatus)){
        return res.status(400).send({
            message : "UserStatus provided is not correct."
        });
    }

    next();
}

const verifyRequestBodiesForAuth = {
    validateSignUpRequestBody,
    validateSignInRequestBody,
    validateNewPassword,
    validateUserUpdateBody
};

module.exports = verifyRequestBodiesForAuth