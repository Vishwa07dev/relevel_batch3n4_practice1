require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/user.model')
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');
const constants = require('../utils/constants');


exports.signup = async (req,res)=>{

    const userObj = {
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        userType : req.body.userType,
        companyId : req.body.userType==constants.userTypes.hr ? req.body.companyId : undefined,
        password : bcrypt.hashSync(req.body.password, 10),
        userStatus : req.body.userType==constants.userTypes.hr ? constants.userStatuses.pending : constants.userStatuses.approved
    };

    try{
        const userCreated = await User.create(userObj); //creating user

        if(userCreated.companyId){
            const company = req.company
            company.hr.push(userCreated._id)
            await company.save();
        }
        
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

        const token = jwt.sign({id: user._id,}, authConfig.secret, {expiresIn : process.env.JWT_TIME}); // expiery time is 24 hours.
        console.log(`#### ${user.userType} ${user.name} logged in ####`);

        res.status(200).send({
            name : user.name,
            username : user.username,
            email : user.email,
            userType : user.userType,
            accesToken : token
        });
    }catch(err){
        console.log("#### Error while user sign in ##### ", err.message);
        res.status(500).send({
            message : "Internal server error while user signin"
        });
    }
}