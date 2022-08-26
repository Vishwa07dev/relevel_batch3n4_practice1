const User = require("../models/user.model");
const constant = require("../utils/constants");


// Using this file we can update the changes in user
exports.update = async(req,res)=>{
    try{
   const user = await User.findOne({userId:req.params.id});
   const isAdmin = await User.findOne({userId:req.userId})
   user.name = req.body.name ? req.body.name:user.name;
   if(isAdmin.userType !== constant.userTypes.admin && (req.body.userType || req.body.userStatus)){
     return res.status(500).send({
      message:"Only admin can change these fields"
     })
   }
   user.userType = req.body.userType ? req.body.userType:user.userType;
   
   user.userStatus = req.body.userStatus ? req.body.userStatus:user.userStatus;
   
   const updatedUser  = await user.save();
   res.status(200).send({
      name:updatedUser.name,
      userId:updatedUser.userId,
      email:updatedUser.email,
      userType:updatedUser.userType,
      userStatus:updatedUser.userStatus,
   })
    }catch(err){
      console.log("Error while DB operation",err.message)
      return res.status(500).send({
        message:"Internal server error"
      })
    }
  }