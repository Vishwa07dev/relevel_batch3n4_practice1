const Company = require("../models/company.model");
const User = require("../models/user.model");
const constants = require("../utils/constants");
const objectConverter = require("../utils/objectConverter");

exports.findAllCompany = async (req, res) => {
    try {
        const companies = await Company.find({});
        return res.status(200).send(objectConverter.companyResponse(companies));
    }
    catch(err){
        return res.status(500).send({
            message : "Internal server error"
        });
    }
}

exports.findCompanyById = async (req, res) => {
    try {
        const company = await  User.find({name : req.params.query});
        return res.status(200).send(objectConverter.companyResponse(company));
    }
    catch(err){
        return res.status(500).send({
            message : "Internal server error"
        })
    }
}

exports.updateCompanyDetails = async (req, res) => {
    try{
        const company = await Company.findOne({userId : req.params.id});
        console.log(req.params.id, company);
        const callingUser = await User.findOne({userId : req.userId}); // this userId updated by extracting the accessToken in the middleware

        if(callingUser.userId === constants.userTypes.admin){ // if calling user is the admin of the same company
            company.name = req.body.name ? req.body.name : company.name;
            company.address = req.body.address ? req.body.address : company.address;
            company.jobsPosted = req.body.jobsPosted ? req.body.jobsPosted : company.jobsPosted;
            company.hrs = req.body.hrs ? req.body.hrs : company.hrs;
        }
        else{
            return res.status(401).send({
                message : "unauthorized! Only admin can update the company details."
            })
        }
        
        const updatedCompanyDetails = await user.save();
        // return res.status(200).send(objectConverter.userResponse(updatedCompanyDetails));
        return res.status(200).send({
            name : updatedCompanyDetails.name,
            address : updatedCompanyDetails.address,
            jobsPosted : updatedCompanyDetails.jobsPosted,
            hrs : updatedCompanyDetails.hrs,
        });
        
    }catch(err){
        return res.status(500).send({
            message : "Internal server error"
        })
    }
}

exports.createCompany = async (req, res) => {
    try {
        const user = await User.findOne({userId : req.userId});

        const companyObj = {
            name : req.body.name,
            address : req.body.address,
            jobsPosted : req.body.jobsPosted,
            hrs : req.body.hrs,
            companyAdmin : user._id
        }
        const companyCreated = await Company.create(companyObj);
    
        if(companyCreated){ 
            console.log(companyCreated._id, user);
            user.companyId = companyCreated._id;
            await user.save();
    
            return res.status(200).send(companyCreated);
        }
    }
    catch(err){
        return res.status(500).send({
            message : `Internal server error : ${err}`
        })
    }
}