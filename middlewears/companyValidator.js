const Company = require("../models/company.model");

const isCompanyPresent = async (req, res, next) => {
    
    const company = Company.find({name: req.body.name, address: req.body.address})
    if(company.name != undefined && company.address != undefined){
        return res.status(403).send({
            message: "Company already present"
        });        
    }
    next();
}

const validateCompany  = {
    isCompanyPresent: isCompanyPresent
}

module.exports = validateCompany