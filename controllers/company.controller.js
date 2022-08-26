const Company = require("../models/company.model");
const User = require("../models/user.model");

exports.createCompany = async (req, res) => {

    const companyObj = {
        name: req.body.name,
        address: req.body.address,
        companyInfo: req.body.companyInfo
    }
    const user = await User.findOne({userId: req.userId});

    if(user.userType !== "HR"){
        res.status(401).send({
            message: "Can not create a company. UserType is not 'HR'."
        })
        return;
    }
    const company = await Company.find({hrs: user._id})
 
    if(company.name != undefined && company.address != undefined){
        res.status(200).send({message:"Company already present"});        
    }

    const companyCreated = await Company.create(companyObj);
    companyCreated.hrs.push(user._id);
    companyCreated.save();

    user.save();

    const response = {
        name: companyCreated.name,
        address: companyCreated.address,
        companyInfo: companyCreated.companyInfo,
        hrs: [user._id]  
    }
    res.status(200).send(response);
}