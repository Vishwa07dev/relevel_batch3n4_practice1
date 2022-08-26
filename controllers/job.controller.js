const User = require('../models/user.model');
const Job = require('../models/job.model');
const Company = require('../models/company.model');
const constants = require('../utils/constants');


exports.CreateJob = async ( req, res)=>{
    
    try{

        const user = await User.findOne({userId : req.userId});
        console.log(user._id);
        let jobObj = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            company : req.query.id,
            postedBy : user._id
        }

        const job = await Job.create(jobObj);
        const company = await Company.findById(req.query.id);
        console.log(req.query.id);
        company.jobsPosted.push(job._id);
        company.hrs.push(user._id);
        await company.save();
        res.status(200).send({
            title : job.title,
            description : job.description,
            status : job.status,
            company : job.company,
            postedBy : job.postedBy
        });

    }catch(err){
        console.log('Some internal error while create the Job', err.message);
        res.status(500).send({
            message : "Some Internal Error"
        })
    }
}

exports.findAllJobs = async( req, res)=>{
    try{
        const jobs = await Job.find();
        res.status(200).send(jobs);
    }catch(err){
        console.log("Some error while the find all Jobs", err.message);
        res.status(500).send({
            message : "Some Internal Error"
        })
    }
}