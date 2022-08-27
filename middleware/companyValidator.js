const Company = require('../models/company.model');

const validateReqBodyCompany = async (req, res, next) =>{
    
    if(!req.body.name){
        res.status(400).send({
            message : "Please provide the company Name !"
        });
        return;
    }
    if(!req.body.address){
        res.status(400).send({
            message : "Please provide the company Address !"
        });
        return;
    }
    const company = await Company.findOne({name : req.body.name});
    if(company){
        res.status(400).send({
            message : "Name already taken !"
        });
        return;
    }
    next();
}

const companyReqBodyValidation = {
    validateReqBodyCompany
}

module.exports = companyReqBodyValidation;