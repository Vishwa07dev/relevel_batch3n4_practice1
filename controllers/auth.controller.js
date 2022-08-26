const User = require('../models/user.model');
const Company = require('../models/company.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {userStatuses , userTypes} = require('../utils/constants');
const authConfig = require('../configs/auth.config');
const constants = require('../utils/constants');
exports.signUp = async (req, res) =>{

    if(req.body.userType != userTypes.applicant){
        req.body.userStatus = userStatuses.pending
    }
    const userObj = {
        name : req.body.name,
        userId : req.body.userId,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,8),
        userStatus : req.body.userStatus,
        userType : req.body.userType,
        companyId : req.body.companyId
    }

    try{
        let userCreated = await User.create(userObj);
        let response = {
            id : userCreated._id,
            name : userCreated.name,
            userId : userCreated.userId,
            email : userCreated.email,
            status : userCreated.userStatus,
            userType : userCreated.userType,
            messsage : "Successfully Registered"
        }

        if(userCreated.userType == constants.userTypes.hr){
            const company = await Company.findOne({_id : req.body.companyId });
            company.hrs.push(userCreated._id);
            await company.save();
        }
        res.status(200).send(response);
        console.log(response);
    }catch(err){
        console.log('Some internal error while create the user', err.message);
        res.status(500).send({
            message : "Some Internal Error"
        })
    }
}

exports.signIn = async ( req, res )=>{
    
    try{
        const user = await User.findOne({userId : req.body.userId});
        if(user == null){
            res.status(400).send({
                message : "UserId is not exists !"
            });
            return;
        }

        if(user.userStatus == userStatuses.pending){
            res.status(400).send({
                message : "Not yet approved from the admin"
            });
            return;
        }
        
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){
            res.status(401).send({
                message : "Password is Wrong !"
            })
        }
        
        const token = jwt.sign({
            id : user.userId
        }, authConfig.secret,{
            expiresIn : 600
        });

        res.status(201).send({
            name : user.name,
            userId : user.userId,
            email : user.email,
            status : user.userStatus,
            type : user.userType,
            accessToken : token
        })

    }catch(err){
        console.log('Some internal error while Log In the user', err.message);
        res.status(500).send({
            message : "Some Internal Error"
        })
    }
}