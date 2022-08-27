const Job = require('../models/job.model');
const constants = require('../utils/constants');

const isValidJobIdInReqParam = async (req,res,next)=>{

    try{

        const jobdata = await Job.findOne({_id : req.params.id});

        if(!jobdata){
            return res.status(400).send({
                message : "Job id provided does not match any jobs"
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


const validateNewJobBody = async (req,res,next)=>{
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

        if (req.body.vacancies && req.body.vacancies < 1){
            return res.status(400).send({
                message: "Minimum number of vacancies is 1"
            });
        }
    
        next();

    }catch{
        console.log("#### Error while velidating new job body ##### ", err.message);
        res.status(500).send({
            message : "Internal server error while job validation"
        });
    }
}

const validateJobUpdateBody = async (req,res,next)=>{
    try{
        
        if(req.user.userType == constants.userTypes.admin || req.jobInParams.postedBy == req.user._id){

            if(req.body.vacancies && req.body.vacancies<1){
                return res.status(400).send({
                    message : "The number of vacancies cannot be less then 1"
                });
            }
            next();
        }else if(req.user.userType == constants.userTypes.applicant){
            next();
        }else{
            return res.status(403).send({
                message : "Unauthorised!"
        });
    }

    }catch{
        console.log("#### Error while validating updated job body ##### ", err.message);
        res.status(500).send({
            message : "Internal server error while job update validation"
        });
    }
}


const verifyJobRequestBodies = {
    isValidJobIdInReqParam,
    validateNewJobBody,
    validateJobUpdateBody
};

module.exports = verifyJobRequestBodies