const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');
const User = require('../models/user.model');
const constants = require('../utils/constants');

const verifyToken = (req, res, next) => {

    const token = req.headers["x-access-token"];

    if(!token) {
        return res.status(403).send({
            message : "No token is provided! Access prohibited"
        })
    }

    jwt.verify(token, authConfig.secret, (error, decoded) =>  {
        if(error) {
            return res.status(401).send({
                message : "UnAuthorized"
            });
        }

        req.userId = decoded.id;
        
        next();
    })

}

const isAdmin = async (req, res, next) => {
    const user = await User.findOne({ userId : req.userId});

    if(user && user.userType == constants.userTypes.admin){
        next();
    } else{
        res.status(403).send({
            message : "Only ADMIN users are allowed to access this endPoint"
        })
    }
}

const isHr = async (req, res, next) => {
    const user = await User.findOne({ userId : req.userId});

    if(user && user.userType == constants.userTypes.hr){
        if(req.body.postedBy){

            const newUser = await User.findOne({ userId : req.body.postedBy});

            if(newUser && newUser.userType == constants.userTypes.hr){
                next();
            } else{
                res.status(403).send({
                    message : "Only a hr user account can be updated to the postedBy"
                })
            }
        } else {
            next();
        }

    } else{
        res.status(403).send({
            message : "Only HR users are allowed to access this endPoint"
        })
    }
}

const isApplicant = async (req, res, next) => {

    // const user = await User.findOne({userId : req.userId});

    if(req.userId == req.jobParams.postedBy){
        return res.status(403).send({
            message : "hr user of the same job can't apply to the job"
        })
    }
}

const isValidUserIdInReqParam = async (req, res, next) => {
    try {
        const user = User.find({ userId: req.params.id });
        if (!user) {
            return res.status(400).send({
                message: "UserId passed doesn't exist"
            })
        }
        next();
    } catch (err) {
        console.log("Error while reading the user info", err.message);
        return res.status(500).send({
            message: "Internal server error while reading the user data"
        })
    }
}



const isAdminOrOwner = async (req, res, next) => {
    /**
     * Either the caller should be the ADMIN or the caller should be the
     * owner of the userId
     */

    try {
        const callingUser = await User.findOne({ userId: req.userId });  //req.userId was got from verifyToken middleware 
        if (callingUser.userType == constants.userTypes.admin || callingUser.userId == req.params.id) {

            if(callingUser.userType == constants.userTypes.admin){
                req.isAdmin = true;
            }
            next();
        } else {
            res.status(403).send({
                message: "Only admin or the owner is allowed to make this call"
            })
        }


    } catch (err) {
        console.log("Error while reading the user info", err.message);
        return res.status(500).send({
            message: "Internal server error while reading the user data"
        })
    }

}

const authJwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin,
    isHr : isHr,
    isApplicant : isApplicant,
    isValidUserIdInReqParam : isValidUserIdInReqParam,
    isAdminOrOwner : isAdminOrOwner
};

module.exports = authJwt;