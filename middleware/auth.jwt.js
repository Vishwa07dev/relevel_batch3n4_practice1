const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');
const User = require('../models/user.model');
const { userTypes } = require('../utils/constants');

const verifyToken = (req, res, next)=>{

    const token = req.headers["x-access-token"];

    if(!token){
        res.status(403).send({
            message : "No token privided ! Access prohibited"
        });
        return;
    }
    
    jwt.verify(token, authConfig.secret,(err,decoded)=>{
        if(err){
            res.status(401).send({
                message : "UnAuthorized !"
            });
        }
        req.userId = decoded.id;
        next();
    })
}

const isAdmin = async (req, res, next) =>{

    const user = await User.findOne({ userId : req.userId});

    if(user && user.userType == userTypes.admin){
        next();
    }else{
        res.status(403).send({
            message : "Only Admin User are Allowed to Access This "
        })
    }
}

const isHR = async (req, res, next) =>{

    const user = await User.findOne({ userId : req.userId});

    if(user && user.userType == userTypes.hr){
        next();
    }else{
        res.status(403).send({
            message : "Only HR User are Allowed to Access This "
        })
    }
}

const isValidUserId = async (req, res, next)=>{
    try{
        const user = await User.findOne({ userId : req.params.id});
        if(!user){
            res.status(400).send({
                message : "UserId passed doesn't exist"
            });
            return;
        }
        next();
    }catch(err){
        console.log("Error while reading the user info ", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

const authJwt = {
    verifyToken,
    isAdmin,
    isValidUserId,
    isHR
}

module.exports = authJwt;