const bcrypt = require('bcryptjs');

exports.updateUser = async (req,res)=>{
    try{
        const user = req.userInParams[0];

        user.name = req.body.name ? req.body.name : user.name
        user.password = req.body.password ? bcrypt.hashSync(req.body.password, 10) : user.password

        if(req.user.isAdmin){       //only admin can change these properties. got property from isAdminOrOwner middlewere
            user.userStatus = req.body.userStatus != undefined ? req.body.userStatus : user.userStatus
            user.userType = req.body.userType != undefined ? req.body.userType : user.userType
        }

        const updatedUser = await user.save();


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