const Company = require("../models/company.model");

exports.createCompany = async (req, res) => {
    try {

        let { name, address } = req.body;

        let comapanyData = {
            name,
            address
        }

        const companyResponse = await Company.create(comapanyData);
        
        res.status(201).send(companyResponse);
    } catch (error) {
        res.status
            (500).send({
                message: 'Some Internal Server Error',
                errorMessage: error.message
            })
    }
}

exports.updateCompany = async (req, res) => {
    try {

        let { name, address, verified } = req.body;
        let companyId = req.params.companyId;

        const companyResponse = await Company.findOne({_id: companyId});
        companyResponse.name = name ? name : companyResponse.name
        companyResponse.address = address ? address : companyResponse.address
        companyResponse.verified = verified ? verified : companyResponse.verified
        
        res.status(201).send(companyResponse);
    } catch (error) {
        res.status
            (500).send({
                message: 'Some Internal Server Error',
                errorMessage: error.message
            })
    }
}
