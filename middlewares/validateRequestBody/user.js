//This middleware contains the logic for handling request bodies coming along with  requests realted to User resource.

const trimValuesInRequestBody = require("../../utils/trimRequestBody");
const Company = require("../../models/company.model");

exports.validateUserUpdateRequestBody = async (req, res, next) => {
  if (req.body.company) {
    //means company is updated in the hr details
    const company = await Company.findOne({ _id: req.body.company });
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Company ID NOT VALID",
      });
    }
  }
  next();
};
