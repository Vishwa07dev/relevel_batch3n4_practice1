const Job = require('../models/job.model');

const vadlidatejobReqBody = async (req, res, next) => {

    try{

        if (!req.body.title) {
            return res.status(400).send({
                message: "Failed ! Job title is not provided"
            });
        }
        if (!req.body.description) {
            return res.status(400).send({
                message: "Failed ! Job description is not provided"
            });
        }

        next();
    } catch (err) {
        console.log("error while validating job body ", err.message);
        res.status(500).send({
            message : "Internal server error"
        });
    }
}

const isValidJobIdInReqParam = async (req, res, next) => {

    try{

        const job = await Job.findOne({ _id : req.params.id });

        if(!job){
            return res.status(400).send({
                message : "jobId passed is not valid"
            })
        }
        req.jobParams = job;
        console.log("req.params", job);
        
        next();

    }catch(err){
        console.log("error while validating the job info ", err.message);
        return res.status(500).send({
            message : "Internal server error"
        })
    }
}

module.exports = {
    vadlidatejobReqBody : vadlidatejobReqBody,
    isValidJobIdInReqParam : isValidJobIdInReqParam
}