const User = require("../models/user.model");
const Company = require("../models/company.model");
const constants = require("../utils/constants");


const isAdminorHr = async (req, res, next) => {
    const user = await User.findOne({ userId: req.userId })
    if (user.userType == constants.userTypes.applicant) {
    
            return res.status(403).send({
                message: "Only Admin | HR can add company"
            })
        

    } 
   
    next();


}

const verifyCompany = {
    isAdminorHr: isAdminorHr
}

module.exports = verifyCompany;