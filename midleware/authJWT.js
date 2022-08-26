const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const User = require("../models/user.model");
const constants= require("../utils/constants");


const verifyToken = (req,res,next)=>{


let token = req.headers["x-access-token"];
     
    /**
     * Check if the token is provided or not
     */
    if(!token){
        return res.status(401).send({
            message :"No token provided"
        })
    }

    /**
     * Go and validate the token
     */
    jwt.verify(token,authConfig.secret,(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message :"Unauthorized"
            })
        }
        req.userId = decoded.id;
        next();
    })
   
    /**
     * read the value pof the token userid and set in the request for further used
     */
}


const isAdmin = async (req,res,next)=> {
    const user = await User.findOne({userId:req.userId})
    if(user && user.userType == constants.userTypes.admin){
     next();
    }else{
     res.status(403).send({
         message:"Only ADMIN users are allowed to access this endpoint"
     })
    }
  }

 
 const authJwt= {
    verifyToken:verifyToken,
    isAdmin:isAdmin
}
module.exports =  authJwt