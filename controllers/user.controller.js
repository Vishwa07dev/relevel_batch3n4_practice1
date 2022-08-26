const User = require('../models/user.model');
const constants = require('../utils/constants');
const Job = require('../models/job.model');

exports.VerifyTheHR = async(req, res)=>{

    try{
        const user = await User.findOneAndUpdate(
            {_id : req.params.id},
            {userStatus : constants.userStatuses.approved},
            {new : true}
        )
        res.status(202).send({
            message : "User Approved Successfully",
            user : user
        })
    }catch(err){
        console.log("Some Error while the verify the HR", err.message);
        res.status(500).send({
            message : "Some Internal Error"
        })    
    }
}

exports.applyTheJob = async (req, res)=>{
    try{
        const user = await User.findOne({userId: req.userId});
        const job = await Job.findOne({_id : req.params.jobId });
        job.applicants.push(user._id);
        user.jobsApplied.push(job._id);
        await job.save();
        await user.save();
        res.status(200).send({
            message : "Successfully Applied"
        })
    }catch(err){
        console.log("Some Error while the appling the job", err.message);
        res.status(500).send({
            message : "Some Internal Error"
        })  
    }
}