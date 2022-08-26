/**
 * Logic for adding company
 */
const Company = require("../models/company.model");
const User = require("../models/user.model");
const constants = require("../utils/constants");

exports.addcompany = async (req,res)=>{
    try{
    // Read the request body and create the ticket object
   const companyObj = {
    name:req.body.name,
    address:req.body.address,
    verified:constants.companyVerificationStatuses.approved
   }
   const user = await User.findOne({ userId: req.userId })
   if(user.userType == constants.userTypes.hr){
    companyObj.verified=constants.companyVerificationStatuses.pending;
   }
   const hr = await User.findOne({
    userId:req.body.hrs
   });
   
   if(hr.userType == constants.userTypes.hr){
    //companyObj.hrs.push(hr._id); // why its giving error?
    companyObj.hrs = hr._id;
   }
 
   const companyCreated = await Company.create(companyObj);
   res.status(201).send(companyCreated);

}catch(err){
    console.log("error while doing the db operations ", err.message);
    return res.status(500).send({
        message:"Internal server error"
    })
}

}
