const Company = require('../models/company.model')

const validateNewCompanyBody = async (req,res,next)=>{
    if (!req.body.name) {
        return res.status(400).send({
            message: "Failed ! Company name is not provided"
        });
    }

    const company = await Company.findOne({name : req.body.name});

    if(company){
        return res.status(400).send({
            message: "Failed ! Company name already exists"
        });
    }
    
    next();
}


const isValidCompanyIdInReqParam = async (req,res,next)=>{
    try{
        const companydata = await Company.findOne({_id : req.params.id});

        if(!companydata){
            return res.status(400).send({
                message : "Company id provided does not match any companies"
            })
        }
        req.company = companydata;    //saves params company in req for later use
        next();
        
    }catch(err){
        console.log("#### Error while reading the company info #### ", err.message);
        return res.status(500).send({
            message : "Internal server error while reading the company data"
        })
    }
}

const verifyCompanyRequestBodies = {
    validateNewCompanyBody,
    isValidCompanyIdInReqParam
};

module.exports = verifyCompanyRequestBodies