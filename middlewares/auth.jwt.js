const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const User = require("../models/user.model");
const constants = require("../utils/constants");


const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            message : "Login to continue."
        });
    }
    
    // Validating for valid token
    jwt.verify(token, authConfig.secretKey, (err, decoded) => {
        if(err){
            return res.status(401).send({
                message : "unauthorized!"
            });
        }
        req.userId = decoded.id; // decodes the userId from the token and assigning it to the req.body for further use.
        next();
    })
}

const isAdmin = async (req, res, next) => {
    const user = await User.findOne({userId : req.userId});

    if(user && user.userType === constants.userTypes.admin){
        next();
    }
    else{
        return res.status(403).send({
            message : "Only admin can request for this."
        });
    }
}

const isCompanyAdmin = async (req, res, next) => {
    const user = await User.findOne({userId : req.userId});

    if(user && user.userType === constants.userTypes.companyAdmin){
        next();
    }
    else{
        return res.status(403).send({
            message : "Only company admin can create the company."
        });
    }
}

const isValideUserReqParams = async (req, res, next) => {
    try {
        const user = await User.find({userId : req.params.id});
        if(!user){
            return res.status(400).send({
                message : "User_Id passed is not present in the database."
            })
        }
        next();
    }
    catch(err){
        return res.status(500).send({
            message : "Internal server error. Please try again."
        })
    }
}

const isAdminOrCompanyAdmin = async (req, res, next) => {
    try{
        const callingUser = await User.findOne({userId : req.userId});

        if(callingUser.userType == constants.userTypes.admin || callingUser.userId == req.params.id){
            next();
        }
        else{
            return res.status(403).send({
                message : "Only the admin or the owner are allowrd to make this request."
            })
        }
    }
    catch(err){
        return res.status(500).send({
            message : "Internal server error. Please try again."
        })
    }
}

module.exports = {verifyToken, isAdmin, isValideUserReqParams, isAdminOrCompanyAdmin};