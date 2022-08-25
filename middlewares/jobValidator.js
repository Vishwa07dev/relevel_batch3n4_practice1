const Job = require('../models/job.model')


const isValidJobIdInReqParam = async (req,res,next)=>{

    try{

        const jobdata = await Job.findOne({_id : req.params.id});

        if(!jobdata){
            return res.status(400).send({
                message : "Job id passed is not valid"
            })
        }
        req.jobInParams = jobdata;    //saves params job in req for later use
        next();
        
    }catch(err){
        console.log("#### Error while reading the job info #### ", err.message);
        return res.status(500).send({
            message : "Internal server error while reading the job data"
        })
    }
}

const verifyJob = {
    isValidJobIdInReqParam
}

module.exports = verifyJob