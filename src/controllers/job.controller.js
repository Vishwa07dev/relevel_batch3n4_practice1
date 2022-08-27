const Job = require('../models/job.model');

exports.createJob = async (req, res) => {

    try {

        const jobObj = {
            title : req.body.title,
            description : req.body.description,
            company : user.companyId,
            postedBy : user._id
        }
        console.log("jobObj : ", jobObj);
        const JobCreated = await Job.create(jobObj);

        res.status(201).send(JobCreated);
    } catch (err) {
        console.log("Error while doing the DB operations", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}

exports.applyForJob = async (req, res)  =>{

    try{
       
        const user = req.user;

        user.jobsApplied.push(req.jobParams._id);
        req.jobParams.applicants.push(user._id);

        await user.save();
        await req.jobParams.save();

        res.status(201).send({
            message : "Job applicaion successfully submitted"
        });
    } catch (err) {
        console.log("error while doing the DB operations ", err.message);

        res.status(500).send({
            message : "Internal server error"
        })
    }
} 

exports.getAllMyJObs = async (req, res) => {

    try {

        const queryObj = {};
        const jobsApplied = req.user.jobsApplied;
        queryObj["_id"] = { $in: jobsApplied};
    
        const jobs = await Job.find(queryObj);
    
        res.status(200).send(jobs)
    
        
    } catch (err) {

        console.log("some error while fetching all your jobs", err.message);
        res.status(500).send({
            message : "Some internal error "
        });
    }
    
}

exports.getAllJobs = async (req, res) => {

    try {

        const jobs = await Job.find();

        res.status(200).send(jobs);
    } catch (err) {

        console.log("some error while fetching all jobs", err.message);
        res.status(500).send({
            message : "Some internal error "
        });
    }
    
}

exports.getAllJobsCreated = async (req, res) => {

    try {

        const jobsCreated = [];
        const jobs = await Job.where("postedBy").equals(req.user._id);
    
        if(jobs.length){
            jobs.forEach(job => {
                jobsCreated.push({
                    title : job.title,
                    description : job.description
                })
            });
        }
    
        res.status(200).send(jobs);
    } catch (err) {
        console.log("some error while fetching jobs created ", err.message);
        res.status(500).send({
            message : "Some internal error "
        });
    }
};



exports.getAllApplicantsFOrTheJob = async (req, res) => {

    try {

        const queryObj = {};
        const jobsApplied = req.user.jobsApplied;
        queryObj["_id"] = { $in: jobsApplied};
    
        const jobs = await Job.find(req.jobParams._id);
    
        res.status(200).send(jobs)
    
        
    } catch (err) {

        console.log("some error while fetching all your jobs", err.message);
        res.status(500).send({
            message : "Some internal error "
        });
    }
    
}


exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findOne({"_id": req.params.id});

        job.title = req.body.title != undefined ? req.body.title : job.title;
        job.description = req.body.description != undefined ? req.body.description : job.description;
        job.status = req.body.status != undefined ? req.body.status : job.status;
        job.postedBy = req.body.postedBy != undefined ? req.body.postedBy : job.postedBy; //If the hr wants to tranfer the authority to a new hr 

        const updatedJob = await job.save();

        res.status(200).send(updatedJob);

    } catch (err) {
        console.log("some error while updating job", err.message);
        res.status(500).send({
            message : "Some internal error while updating the job"
        })
    }
}