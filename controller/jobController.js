
const Job = require("../models/job.model");

const User = require("../models/user.model");
const constant = require("../utils/constants");

exports.createJob = async (req,res)=>{
    try{
    // Read the request body and create the job object
   const jobObj = {
    title:req.body.title,
    description:req.body.description,
    company:req.body.company,
    postedBy:req.body.postedBy,
    }
    
    const jobCreated = await Job.create(jobObj);

    res.status(201).send(jobCreated)
   
}catch(err){
    console.log("error while doing the db operations ", err.message);
    return res.status(500).send({
        message:"Internal server error"
    })
}

}

// Logic for application  submittion

 exports.applyJob = async(req,res)=>{
    try{
       const job = await Job.findOne({_id:req.params.id})// why returns null
       console.log("---------------------------------")
       console.log(job);
        const user = await User.findOne({userId:req.userId});
        console.log("user----> 1 ",user)
        
        if(user.userType == constant.userTypes.applicant){
            console.log("2-->",user._id);
        job.applicants.push(user._id);
        
 const jobres  = await job.save();
 res.status(200).send({
    message:"Successfuly applied"
 })
        }else{
            return res.status(500).send({
                message:"Only applicant can apply"
        })
    }
    }catch(err){
        console.log("error while doing the db operations ", err.message);
        return res.status(500).send({
            message:"Internal server error"
        })
    }
 }