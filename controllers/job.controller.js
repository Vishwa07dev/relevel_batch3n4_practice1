const Job = require('../models/job.model')
const Company = require('../models/company.model');
const constants = require('../utils/constants');

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

        const poster = req.user;

        poster.jobsPosted.push(jobCreated._id);
        await poster.save();

        const company = await Company.findOne({_id : req.user.companyId});
        company.jobsPosted.push(jobCreated._id);
        await company.save();
        
        console.log(`#### New job '${jobCreated.title}' created by ${req.user.name} ####`);
        res.status(201).send(jobCreated);


    }catch(err){
        console.log("#### Error while creating new job #### ", err.message);
        res.status(500).send({
            message : "Internal server error while creating new job"
        });
    }
}


exports.editJob = async (req,res)=>{
    if(req.user.userType == constants.userTypes.applicant){
        try{

            req.user.jobsApplied.push(req.jobInParams._id);
            req.user.save();
    
            req.jobInParams.applicants.push(req.user._id);
            req.jobInParams.save();
    
            console.log(`#### ${req.user.name} applied for ${req.jobInParams.title} ####`);
            res.status(201).send({message : "Job applicaion successfully submitted"});
    
        }catch(err){
            console.log("#### Error while applying for the job #### ", err.message);
            res.status(500).send({
                message : "Internal server error while applying for the job"
            });
        }
    }else{
        try{
            const job = req.jobInParams;
    
            job.description = req.body.description ? req.body.description : job.description
            job.vacancies = req.body.vacancies ? req.body.vacancies : job.vacancies
            job.status = req.body.status ? req.body.status : job.status
    
            const updatedJob = await job.save();
    
    
            console.log(`#### ${updatedJob.title} data updated by ${req.user.userType} ${req.user.name} ####`);
            res.status(200).send({updatedJob});
    
        }catch(err){
            console.log("#### Error while updating job data #### ", err.message);
            res.status(500).send({
                message : "Internal server error while updating job data"
            });
        }
    }
}