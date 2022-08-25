require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/user.model')
const Company = require('../models/company.model')
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');
const constants = require('../utils/constants');
const sendVerificationEmail = require('../utils/sendEmailRequest')


exports.signup = async (req,res)=>{

    const userObj = {
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        userType : req.body.userType,
        companyId : req.body.userType==constants.userTypes.hr ? req.body.companyId : undefined,
        password : bcrypt.hashSync(req.body.password, 10),
        userStatus : constants.userStatuses.pending // every user's status will be pending until they can verify account
    };

    try{
        const userCreated = await User.create(userObj); //creating user

        if(userCreated.companyId){
            const company = await Company.findOne({_id : userCreated.companyId})
            company.hr.push(userCreated._id)
            await company.save();
        }
        
        sendVerificationEmail.accountVerification(userCreated); //sending verification link to email-id

        const response = {
            name : userCreated.name,
            username : userCreated.username,
            email : userCreated.email,
            userType : userCreated.userType,
            userStatus : userCreated.userStatus,
        }


        console.log(`#### ${response.userType} ${response.name} created ####`);
        res.status(201).send(response);
    }catch(err){
        console.log("#### error while user sign up #### ", err.message);
        res.status(500).send({
            message : "Internal server error while creating user"
        });
    }
}

exports.signin = async (req,res)=>{
    try{
        const user = await User.findOne({username : req.body.username})
        if(!user){
            return res.status(400).send({
                message : "Failed! username provided dosen't exist"
            });
        }
        
        if(!user.emailVerified){
            return res.status(400).send({
                message : "Failed! user is not verified yet"
            });
        }

        if(user.userStatus == constants.userStatuses.pending){
            return res.status(400).send({
                message : "User is not yet approved from the admin"
            });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){
            return res.status(401).send({
                message : "Wrong password"
            });
        }

        const token = jwt.sign({id: user._id, purpose: "authentication"}, authConfig.secret, {expiresIn : process.env.JWT_TIME}); // expiery time is 24 hours.
        console.log(`#### ${user.userType} ${user.name} logged in ####`);

        res.status(200).send({
            name : user.name,
            username : user.username,
            email : user.email,
            userType : user.userType,
            userStatus : user.userStatus,
            accesToken : token
        });
    }catch(err){
        console.log("#### Error while user sign in ##### ", err.message);
        res.status(500).send({
            message : "Internal server error while user signin"
        });
    }
}

exports.verifyUserEmail = (req,res)=>{ //controller to verify user account. the check for link is already done in middlewere
    try{
        req.user.emailVerified = true;
        if(req.user.userType == constants.userTypes.applicant){
            req.user.userStatus = constants.userStatuses.approved; //applicant is autometically approved on verification
        }
        req.user.save();
        console.log(`#### ${req.user.userType} ${req.user.name} is verified ####`);
        res.status(200).send({
            message : "Email verification successful;"
        });
    }catch(err){
        console.log("#### Error while verifying user email ##### ", err.message);
        res.status(500).send({
            message : "Internal server error while email verification"
        });
    }
}

exports.resendVerificationEmail = (req,res)=>{
    const user = req.userInParams[0];
    if(user.emailVerified){
        return res.status(401).send({
            message : "The user is already verified"
        })
    }

    try{
        sendVerificationEmail.accountVerification(user);
        return res.status(201).send({
            message : "Verification email resent"
        });
    }catch(err){
        console.log("#### Error while resending verification email ##### ", err.message);
        res.status(500).send({
            message : "Internal server error while resending verification email"
        });
    }
}