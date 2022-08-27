const Company = require("../models/company.model");
const constants = require('../utils/constants');


exports.createCompany = async (req, res)=>{
    
    try{
        const companyObj = {
            name : req.body.name,
            address : req.body.address
        }

        const company = await Company.create(companyObj);

        res.status(201).send(company)

    }catch(err){
        cosnole.log('Some internal error while create the company', err.message);
        res.status(500).send({
            message : "Some Internal Error"
        })
    }
}

exports.findAllCompanies = async ( req, res)=>{
    try{
        const companies = await Company.find();
        res.status(200).send(companies)

    }catch(err){
        console.log("Some internal error while fetching all companies !", err.message);
        res.status(500).send({
            message : "Some Internal Error"
        })
    }
}

exports.verifyTheCompany = async ( req, res) =>{
    try{
        
        const updateCompany = await Company.findOne({_id : req.params.id});
        updateCompany.verified = constants.companyVerificationStatuses.approved
        await updateCompany.save();

        res.status(201).send({
            message : "Successfully approved !",
            company : updateCompany
        })
    }catch(err){
        console.log("Some internal error while verifing the company !", err.message);
        res.status(500).send({
            message : "Some Internal Error"
        })
    }
}