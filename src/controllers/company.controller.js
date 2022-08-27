const Company = require('../models/company.model');

exports.createCompany = async (req, res) => {

    try {
        console.log("createcom")

        const user = req.user;

        const jobObj = {
            name : req.body.name,
            address : req.body.address,
            verified : req.body.verified
        }
        console.log("jobObj : ", jobObj);
        const companyCreated = await Company.create(jobObj);

        res.status(201).send(companyCreated);
    } catch (err) {
        console.log("Error while doing the DB operations", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}


exports.getAllCompanies = async (req, res) => {

    try {

        const companies = await Company.find();

        res.status(200).send(companies);
    } catch (err) {

        console.log("some error while fetching all companies", err.message);
        res.status(500).send({
            message : "Some internal error "
        });
    }
    
}

exports.updateCompany = async (req, res) => {
    try {
        const company = await company.findOne({"_id": req.params.id});

        company.name = req.body.name != undefined ? req.body.name : company.name;
        company.address = req.body.address != undefined ? req.body.address : company.address;
        if(isAdmin){
            job.verified = req.body.verified != undefined ? req.body.verified : job.verified;
        }
        

        const updatedCompany = await company.save();

        res.status(200).send(updatedCompany);

    } catch (err) {
        console.log("some error while updating company", err.message);
        res.status(500).send({
            message : "Some internal error while updating the job"
        })
    }
}
