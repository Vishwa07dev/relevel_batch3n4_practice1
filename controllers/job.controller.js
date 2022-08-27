const Job = require('../models/job.model');


exports.createJob = async ( req, res)=>{
    
    try{

        console.log(req.id);
        let jobObj = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            company : req.company._id,
            postedBy : req.id
        }

        const job = await Job.create(jobObj);
        const company = req.company;
        console.log(req.query.id);
        company.jobsPosted.push(job._id);
        await company.save();
        res.status(201).send({
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