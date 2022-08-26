/**
 * This file will contain the logic for the
 * registration of the user and login of the user
 * 
 * User :
 * 
 * Customer
 *    1. Registers and is approved by default
 *    2. Should be able to login immediately
 * 
 * 
 * Hr 
 *    1. Should be able to registered
 *    2. Initially he/she will be in PENDING state
 *    3. ADMIN should be able to approve this
 * 
 * 
 * Admin
 *    1. ADMIN user should be only created from the backend...No API should be supported
 * for it
 */

const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config")
const constants = require("../utils/constants");


exports.signup = async (req, res)=>{
    /**
     * I need to read the data from the request body
     */
    console.log("in--------------------------------------------------------------------")

    if(req.body.userType != constants.userTypes.customer){
        req.body.userStatus = constants.userStatuses.pending;
    }


    /**
     * Convert that into the JS object for inserting in the mongo db
     */
    const userObj = {
        name :  req.body.name,
        userId  : req.body.userId,
        email : req.body.email,
        userType : req.body.userType,
        password : bcrypt.hashSync(req.body.password, 8),
        userStatus : req.body.userStatus,
        companyId : req.body.userType==constants.userTypes.hr ? req.body.companyId : undefined
    };


    try{
        const userCreated = await User.create(userObj);

        const response = {
            name  : userCreated.name,
            userid : userCreated.userId,
            email : userCreated.email,
            userType : userCreated.userType,
            userStatus : userCreated.userStatus,
            createdAt : userCreated.createdAt,
            updatedAt : userCreated.updatedAt
        }

        res.status(201).send(response);

    } catch(err) {
        console.log("Some error happened ", err.message);
        res.status(500).send({
            message : "Some internal server error"
        });
    }
}

exports.signin = async (req, res) => {
    /**
     * If the userId passed is incorrect
     */
     try {
        const user = await User.findOne({userId : req.body.userId});
        
        if(user == null){
            return res.status(400).send({
                message : "Failed to login. UserId passed is't correct"
            })
        }
        if(user.userStatus == constants.userStatuses.pending){
            return res.status(400).send({
                message : "Not yet approved by the Admin"
            })
        }

        const passwordIsVaild = bcrypt.compareSync(req.body.password, user.password);
        
        if(!passwordIsVaild){
            return res.status(401).send({
                message : "Worng Password"
            })
        }

        const token = jwt.sign({
            id : user.userId
        }, authConfig.secret, {
            expiresIn : 600
        });

        res.status(200).send({
            name : user.name,
            userId : user.userId,
            email : user.email,
            userType : user.userType,
            userStatus : user.userStatus,
            accessToken : token
        })
     } catch (err) {
        console.log("Internal error, ", err.message);
        res.status(500).send({
            message : "Some internal error occured while signin"
        });
     }
}