//this middleware file having the logic to validateids passed in request param
const { isValidObjectId } = require("mongoose");
const Company = require("../models/company.model");
const Job = require("../models/job.model");
const User = require("../models/user.model");

//to check whether valid companyId passed as request paramater
const isValidCompanyIdInReqParam = async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({
      success: false,
      message: "No CompanyId passed as parameter.",
    });
  }
  //check whether companyId is of valid ObjectId type or not
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Not a valid companyId.",
    });
  }
  try {
    const company = await Company.findById(req.params.id);
    if (company == null) {
      return res.status(400).json({
        success: false,
        message: "Not a valid companyId.",
      });
    }
    //valid companyId,pass the control to next
    next();
  } catch (error) {
    console.log("Error while accessing the  info", error.message);
    return res.status(500).send({
      message: "Internal server error while accessing the  data.",
    });
  }
};

//to check whether the ValidUserId passed as request parameter
const isValidUserIdInReqParam = async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({
      success: false,
      message: "No UserId passed as parameter.",
    });
  }

  try {
    const user = await User.findOne({ userId: req.params.id });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "UserId passed,doesn't exist.",
      });
    }
    //userId exists,pass the control to next
    next();
  } catch (error) {
    console.log("Error while accessing the data", error.message);
    return res.status(500).send({
      message: "Internal server error while reading the data",
    });
  }
};

//to check whether valid jobId passed as request paramater
const isValidJobIdInReqParam = async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({
      success: false,
      message: "No jobId passed as parameter.",
    });
  }
  //check whether jobId is of valid ObjectId type or not
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Not a valid jobId.",
    });
  }
  try {
    const job = await Job.findOne({ _id: req.params.id });
   
    if (job == null) {
      return res.status(400).json({
        success: false,
        message: "Not a valid jobId.",
      });
    }
    //valid jobId,pass the control to next
    next();
  } catch (error) {
    console.log("Error while accessing the  info", error.message);
    return res.status(500).send({
      message: "Internal server error while accessing the  data.",
    });
  }
};

module.exports = {
  isValidJobIdInReqParam,
  isValidCompanyIdInReqParam,
  isValidUserIdInReqParam,
};
