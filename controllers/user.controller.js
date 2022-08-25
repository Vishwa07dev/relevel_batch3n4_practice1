const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmailRequest')

exports.updateUser = async (req,res)=>{
    try{
        console.log("start");
        const user = req.userInParams[0];

        user.name = req.body.name ? req.body.name : user.name
        user.password = req.body.password ? bcrypt.hashSync(req.body.password, 10) : user.password

        console.log("before");

        if(req.user.isAdmin){       //only admin can change these properties. got property from isAdminOrOwner middlewere
            user.userStatus = req.body.userStatus != undefined ? req.body.userStatus : user.userStatus
            user.userType = req.body.userType != undefined ? req.body.userType : user.userType
        }

        console.log("after");

        const updatedUser = await user.save();
        console.log("end");


        console.log(`#### ${updatedUser.userType} ${updatedUser.name} data updated ####`);
        res.status(200).send({
            name : updatedUser.name,
            username : updatedUser.username,
            email : updatedUser.email,
            userTypes : updatedUser.userType,
            userStatus : updatedUser.userStatus
        });

    }catch(err){
        console.log("#### Error while updating user data #### ", err.message);
        res.status(500).send({
            message : "Internal server error while updating user data"
        });
    }
}

exports.sendPasswordResetLink = (req,res)=>{
    try{
        const user = req.userInParams[0];
        sendEmail.resetPassword(user);
        return res.status(201).send({
            message : "Password reset link sent in Email"
        });

    }catch(err){
        console.log("#### Error while sending password reset email ##### ", err);
        res.status(500).send({
            message : "Internal server error while sending password reset email"
        });
    }
}

exports.resetPassword = async (req,res)=>{
    try{
        const user = req.user;
        user.password = bcrypt.hashSync(req.body.password, 10);
        await user.save();
        console.log(`#### ${user.userType} ${user.name} password updated using link`);
        res.status(200).send({message : "password updated"});
    }catch(err){
        console.log("#### Error while updating user password using link #### ", err.message);
        res.status(500).send({
            message : "Internal server error while updating user password"
        });
    }
}