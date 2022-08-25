const User = require('../models/user.model')
const Job = require('../models/job.model')
const Company = require('../models/company.model')
const sendNotificationReq = require('../utils/sendEmailRequest')

exports.createJob = async (req,res)=>{
    try{
        const jobData = {
            title : req.body.title,
            description : req.body.description,
            vacancies : req.body.vacancies,
            postedBy : req.user._id,
            company : req.user.companyId
        }
    
        const jobCreated = await Job.create(jobData);
        if(jobCreated){
            const poster = req.user;  // got user from JWT userID in middlewere

            poster.activeJobsPosted.push(jobCreated._id);
            await poster.save();

            const company = await Company.findOne({_id : req.user.companyId});
            company.activeJobsPosted.push(jobCreated._id);
            await company.save();
            
            console.log(`#### New job '${jobCreated.title}' created by ${req.user.name} ####`);
            res.status(201).send(jobCreated);
        }

    }catch(err){
        console.log("#### Error while creating new job #### ", err);
        res.status(500).send({
            message : "Internal server error while creating new job"
        });
    }
}


exports.applyJob = async (req,res)=>{
    try{
        req.user.jobsApplied.push(req.jobInParams._id);
        req.user.save();
        req.jobInParams.applicants.push(req.user._id);
        req.jobInParams.save();
        hr = await User.findOne({_id : req.jobInParams.postedBy})
        sendNotificationReq.jobApplied(req.jobInParams, req.user, hr)
        console.log(`#### ${req.user.name} applied for ${req.jobInParams.title} ####`);
        res.status(201).send({message : "Job applicaion successfully submitted"});
    }catch{
    }
}