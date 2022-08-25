const User = require('../models/user.model')
const constants = require('../utils/constants')

const isAdmin = (req,res,next)=>{

    const user = req.user

    if (user && user.userType == constants.userTypes.admin){
        next();
    }else{
        return res.status(403).send({
            message : "only ADMIN users are allowed to access this endpoint"
        })
    }
}

const isHr = (req,res,next)=>{

    const user = req.user

    if (user && user.userType == constants.userTypes.hr){
        next();
    }else{
        return res.status(403).send({
            message : "only HRs are allowed to access this endpoint"
        })
    }
}

const isApplicant = (req,res,next)=>{

    const user = req.user

    if (user && user.userType == constants.userTypes.applicant){
        next();
    }else{
        return res.status(403).send({
            message : "only Applicants are allowed to access this endpoint"
        })
    }
}

const isValidUsernameInReqParam = async (req,res,next)=>{

    try{

        const user = await User.find({username : req.params.username}); //returns an array of user

        if(!user){
            return res.status(400).send({
                message : "username dosen't exist"
            })
        }
        req.userInParams = user;    //saves params user in req for later use
        next();
        
    }catch(err){
        console.log("#### Error while reading the user info #### ", err.message);
        return res.status(500).send({
            message : "Internal server error while reading the user data"
        })
    }
}

const isAdminOrOwner = (req,res,next)=>{

    try {

        if(req.user.userType == constants.userTypes.admin){
            req.user.isAdmin = true;        // adds isAdmin tag for further use in controller
            next();

        }else if(req.user.username == req.params.username){
            next();
            
        }else{
            return res.status(403).send({
                message : "Only admin or owner is allowed to make this call"
            })
        }
    }catch(err){
        console.log("#### Error while reading the user info #### ", err.message);
        return res.status(500).send({
            message : "Internal server error while reading the user data"
        })
    }

}

const authJwt = {
    isAdmin,
    isHr,
    isApplicant,
    isValidUsernameInReqParam,
    isAdminOrOwner
}

module.exports = authJwt