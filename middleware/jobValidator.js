const User = require('../models/user.model');
const constants = require('../utils/constants');


const validateJob = async ( req, res, next)=>{
    
    if(!req.body.title){
        res.status(400).send({
            message : "Please provide the title of Job"
        })
        return;
    }
    if(!req.body.description){
        res.status(400).send({
            message : "Please provide the description of Job"
        })
        return;
    }
    // if(!req.body.status){
    //     res.status(400).send({
    //         message : "Please provide the status of Job"
    //     })
    //     return;
    // }

    const user = await User.findOne({userId : req.userId});
    if(user.userType != constants.userTypes.applicant){
        next();
    }else{
        res.status(400).send({
            message : " Only HR create the job"
        })
    }
}

const jobReqBodyValidation = {
    validateJob
};
module.exports = jobReqBodyValidation;