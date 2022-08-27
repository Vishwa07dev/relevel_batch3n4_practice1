const User = require('../models/user.model');
const Company = require('../models/company.model');
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
    if(user.userType != constants.userTypes.hr){
        res.status(400).send({
            message : " Only HR create the job"
        })
        return;    
    }
    req.id = user._id;
    const company = await Company.findById(req.query.id);
    if(!company){
        res.status(400).send({
            message : "Company does't exists !"
        })
        return;
    }
    req.company = company;
    next();
}

const jobReqBodyValidation = {
    validateJob
};
module.exports = jobReqBodyValidation;