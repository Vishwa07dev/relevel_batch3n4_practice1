require('dotenv').config();
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');
const User = require('../models/user.model')

const userToken = (req,res,next)=>{

    const token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            message : "no token provided! Access prohibited"
        })
    }

    jwt.verify(token, authConfig.secret, async (err, decoded)=>{
        if(err){
            return res.status(401).send({
                message : "UnAuthorised!"
            })
        }
                    
        const user = await User.findOne({_id : decoded.id});
        if(!user){
            return res.status(400).send({
                message : "UserId provided does not match any user"
            })
        }
        req.user = user;        //saving user data in req
        next();
    })
}

const verifyTokens = {
    userToken,
};

module.exports = verifyTokens