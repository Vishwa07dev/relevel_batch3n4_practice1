const User = require("../models/user.model");
const objectConverter = require("../utils/objectConverter");
const constants = require("../utils/constants");

exports.findAll = async (req, res) => {
    const queryObj = {};
    const userTypeQP = req.query.userType;
    const userStatusQP = req.query.userStatus;

    if(userTypeQP){
        queryObj.userType = userTypeQP;
    }
    if(userStatusQP){
        queryObj.userStatus = userStatusQP;
    }

    try {
        const users = await User.find(queryObj);
        return res.status(200).send(objectConverter.userResponse(users));
    }
    catch(err){
        return res.status(500).send({
            message : "Internal server error"
        });
    }
}

exports.findByUserId = async (req, res) => {
    try {
        const user = await  User.find({userId : req.params.id});
        return res.status(200).send(objectConverter.userResponse(user));
    }
    catch(err){
        return res.status(500).send({
            message : "Internal server error"
        })
    }
}

exports.update = async (req, res) => {
    try{
        const user = await User.findOne({userId : req.params.id});
        const callinUser = await User.findOne({userId : req.userId}); // this userId updated by extracting the accessToken in the middleware
        
        //updating the USER whose id was shared via params
        user.name = req.body.name ? req.body.name : user.name;
        if((req.body.userType || req.body.userStatus) && callinUser.userType === constants.userTypes.admin){ //only admin can change the userType and userStatus
            user.userType = req.body.userType ? req.body.userType : user.userType;
            user.userStatus = req.body.userStatus ? req.body.userStatus : user.userStatus;
        }
        else if((req.body.userType || req.body.userStatus) && callinUser.userType !== constants.userTypes.admin){
            return res.status(401).send({
                message : "unauthorized! Only admin can change the userType and userStatus."
            })
        }
        
        const updatedUser = await user.save();
        // return res.status(200).send(objectConverter.userResponse(updatedUser));
        return res.status(200).send({
            name : updatedUser.name,
            email : updatedUser.email,
            jobsApplied : updatedUser.jobsApplied,
        });
        
    }catch(err){
        return res.status(500).send({
            message : "Internal server error"
        })
    }
}