const User = require('../models/user.model');
const objectConverter = require("../utils/objectConverter");

exports.findAll = async (req, res) =>{
    const querObj = {};

    const userType = req.query.userType;
    const userStatus = req.query.userStatus;

    if(userStatus){
        querObj.userStatus = userStatus;
    }
    if(userType){
        querObj.userType = userType;
    }

    try {

        const users = await User.find(querObj);
        res.status(200).send(objectConverter.userResponse(users));

    } catch(err) {
        console.log("Error while fetching the users filtered users", err.message);
        res.status(500).send({
            message : "Internal server error"
        });
    }
}

exports.findByUserId = async (req, res) => {

    try {
        const user = await User.find({ userId: req.params.id });
        
        return res.status(200).send(objectConverter.userResponse(user));

    } catch (err) {
        console.log("Error while searching the user ", err);
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}


exports.update = async (req, res) => {

    try {
        const user = await User.findOne({ userId: req.params.id });
        if(req.isAdmin){
            user.userStatus = req.body.userStatus != undefined ? req.body.userStatus : user.userStatus;
        }
        user.name = req.body.name != undefined ? req.body.name : user.name;
        user.email = req.body.email != undefined ? req.body.email : user.email;
        user.userType = req.body.userType != undefined ? req.body.userType : user.userType;
        const updatedUser = await user.save();
        res.status(200).send({
            name : updatedUser.name,
            email : updatedUser.email,
            userType : updatedUser.userType,
            userStatus : updatedUser.userStatus
        });
    } catch (err) {
        console.log("Error while DB operation", err.message);
        res.status(500).send({
            message: "Internal server error"
        })
    }
}
