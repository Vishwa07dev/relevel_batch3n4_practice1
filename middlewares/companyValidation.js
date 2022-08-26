const constant = require("../utils/constants");
const Company = require("../models/company.model");

exports.validateCompany = async (req, res, next) => {

    if (req.body.companyId) {

        let companyResponse = await Company.findOne({ _id: req.body.companyId });

        if (companyResponse && companyResponse.verified !== constant.companyVerificationStatuses.approved) {
            return res.status(400).send({
                message: "Failed ! Company is not approved yet"
            })
        } else if (!companyResponse) {
            return res.status(400).send({
                message: "Failed ! No Company is found with id " + req.body.companyId
            })
        }
    }

    if (req.params.companyId) {

        let companyResponse = await Company.findOne({ _id: req.params.companyId });

        if (!companyResponse) {
            return res.status(400).send({
                message: "Failed ! No Company is found with id " + req.body.companyId
            })
        }
    }


    next();
}

exports.validateCompanyRequestBody = async (req, res, next) => {

    if (!req.body.name) {
        return res.status(400).send({
            message: "Failed ! Company name is not provided"
        })
    }

    if (!req.body.address) {
        return res.status(400).send({
            message: "Failed ! Address is not provided"
        })
    }

    next();

}
