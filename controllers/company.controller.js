const Company = require('../models/company.model')

exports.createCompany = async (req,res)=>{
    try{
        const companyData = {
            name : req.body.name,
            address : req.body.address,
            details : req.body.details,
        }
    
        const companyCreated = await Company.create(companyData);

        console.log(`#### New company '${companyCreated.name}' created by ${req.user.userType} ${req.user.name} ####`);
        res.status(201).send(companyCreated);

    }catch(err){
        console.log("#### Error while creating new company #### ", err.message);
        res.status(500).send({
            message : "Internal server error while creating new company"
        });
    }
}

exports.updateCompany=async (req,res)=>{
    try{

        const company = req.company;

        company.name = req.body.name ? req.body.name : company.name
        company.address = req.body.address ? req.body.name : company.address
        company.details = req.body.details ? req.body.details : company.details

        const updatedCompany = await company.save();


        console.log(`####  ${updatedCompany.name} data updated ####`);

        res.status(200).send(updatedCompany);

    }catch(err){
        console.log("#### Error while updating the company #### ", err.message);
        res.status(500).send({
            message : "Internal server error while updating the company"
        });
    }
}