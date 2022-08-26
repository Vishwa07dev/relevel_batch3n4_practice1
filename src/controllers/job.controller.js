const constants = require('../utils/constants');
const Job = require('../models/job.model');
const User = require('../models/user.model');


exports.createJob = async (req, res) => {

    try {
        console.log("in++++++++")
        console.log("userid-job.co", req.userId);
        const user = await User.findOne({ userId : req.userId });
        console.log("user-job.con- ", user)
        const jobObj = {
            title : req.body.title,
            description : req.body.description,
            company : user.companyId,
            postedBy : user._id
        }
        console.log(jobObj);
        const JobCreated = await Job.create(jobObj);
        // console.log("job-con, jobcre", jobsCreated);

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

        const user = await User.findOne({ userId : req.userId });

        user.jobsApplied.push(req.jobParams._id);
        req.jobParams.applicants.push(user._id);

        await user.save();
        await req.jobInParams.save();

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

exports.getAllJObs = async (req, res) => {

    const user = await User.findOne({ userId : req.user.userId });
    const queryObj = {};
    const jobsApplied = user.jobsApplied;
    const jobsCreated = [];
    queryObj["_id"] = { $in: jobsApplied};

    if(user.userType == constants.userTypes.applicant){
        if(!jobsApplied){
            return res.status(200).send({
                message : "No jobs applied by the user yet"
            });
        };
    } else if (user.userType == constants.userTypes.hr){

        if(!jobsApplied && !jobsCreated.length){
            return res.status(200).send({
                message : "No jobs applied and no jobs created"
            })
        }
        const jobs = await Job.where("postedBy").equals(user._id);

        jobs.forEach(job => {
            jobsCreated.push({
                title : job.title,
                description : job.description
            })
        })

        console.log(queryObj, ": queryObj");
    }

    const jobs = await Job.find(queryObj);

    if(jobsCreated.length){
        res.status(200).send({
            jobsApplied : {
                jobs
            },
            jobsCreated : {
                jobsCreated
            }
        });
    } else{
        res.status(200).send(jobs);
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
        console.log("soem error while updating job", err.message);
        res.status(500).send({
            message : "Some internal error while updating the job"
        })
    }
}