const isEnglish = require("is-english");
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const Filter = require("bad-words");
const filter = new Filter();

const Company = require("../models/company.model");
const User = require("../models/user.model");
const constants = require("../utils/constants");
const Job = require("../models/job.model");

exports.create = async (req, res, next) => {
  // check if the user is an approved hr or an approved Admin
  // we get req.user from jwtAuth
  if (req.user.userType == constants.userTypes.applicant) {
    return res.status(400).send("You are not authorized for this request");
  } // if admin check whether the Company exists or not if it exists check whether the company is approved
  if (req.user.userType == constants.userTypes.admin) {
    // if id is provided in body
    if (!req.body.id) {
      return res
        .status(400)
        .send("You have to provide a valid company id for this request");
    }
    // check if valid objectId
    if (!mongoose.isValidObjectId(req.body.id)) {
      return res.status(400).send("the id you've provided is not valid");
    }
    // company exists or not
    let companyExists;
    try {
      companyExists = await Company.findOne({ _id: req.body.id });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send("Internal server error please try again later");
    }
    if (!companyExists) {
      return res.status(400).send("the id you've provided is not valid");
    }
    // check whether the company is approved
    if (
      companyExists.verified !== constants.companyVerificationStatuses.approved
    ) {
      return res
        .status(400)
        .send(
          "The company is not allowed to create jobs as of yet please refer to our website for more details"
        );
    }
  }
  // check wether the company is in active state

  // if hr tries to provide a body.id
  let companyExists;
  if (req.user.userType == constants.userTypes.hr) {
    try {
      companyExists = await Company.findOne({ _id: req.user.companyId });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send("Internal server error please try again later");
    }
    req.body.id = undefined;
  }
  // title
  //check whether the title exists
  if (!req.body.title) {
    return res.status(400).send("You have to provide a title");
  }
  req.body.title.trim();
  if (req.body.title.length > 50 || req.body.title.length < 15) {
    return res
      .status(400)
      .send(
        "You have to provide a title which has atleast 5 characters and not more than 20 "
      );
  }
  //body
  // to check whether the title is in english
  if (!isEnglish(req.body.title)) {
    return res
      .status(400)
      .send("You have to provide a title which is in english");
  }
  // have a vulgarity check on the title
  let isVulgarTitle = await filter.isProfane(req.body.title);
  if (isVulgarTitle) {
    let filteredSentence = filter.clean(req.body.title);
    return res.status(400).send({
      errorMessage:
        "The title you have provided is indecent, the starred words in message are considered indecent,please refer to our website for more details",
      message: filteredSentence,
    });
  }

  // description,
  if (!req.body.description) {
    return res.status(400).send("You have to provide a description ");
  }
  req.body.description.trim();
  if (req.body.description.length < 30 || req.body.description.length > 150) {
    return res
      .status(400)
      .send(
        "You have to provide a description which has atleast 30 characters and not more than 150 "
      );
  }
  if (!isEnglish(req.body.description)) {
    return res
      .status(400)
      .send("You have to provide a description which is in english");
  }
  let isVulgarDescription = await filter.isProfane(req.body.description);
  if (isVulgarDescription) {
    let filteredSentence = filter.clean(req.body.description);
    return res.status(400).send({
      errorMessage:
        "The description you have provided is indecent, the starred words in message are considered indecent,please refer to our website for more details",
      message: filteredSentence,
    });
  }
  // status
  // check if status exists
  if (req.body.status) {
    req.body.status = req.body.status.toUpperCase();
    // check if it is a valid status
    if (constants.jobStatuses[req.body.status.toLowerCase()] == undefined) {
      return res
        .status(400)
        .send("Your status for the job can only be active or expired");
    }
  } else {
    req.body.status = constants.jobStatuses.active;
  }
  req.company = companyExists;
  next();
};

exports.applyForJob = async (req, res, next) => {
  // is it an applicantt
  if (req.user.userType != constants.userTypes.applicant) {
    return res
      .status(400)
      .send("You are not allowed to make this request, as of now...");
  } // do they have a valid status
  if (req.user.userStatus !== constants.userStatuses.approved) {
    return res
      .status(400)
      .send(
        "You are not allowed to make this request, since you are unapproved..."
      );
  }
  // is job id provided?
  if (!req.params.id) {
    return res
      .status(400)
      .send("You have to provide a valid id for this request");
  } // check if it is a valid id
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("invalid id for this request was provided");
  }
  let doesJobExist;
  try {
    // check if the job exists
    doesJobExist = await Job.findOne({ _id: req.params.id });
    if (!doesJobExist) {
      return res
        .status(400)
        .send("This job id does not exist try again with a valid id...");
    }
    //check whether it is in an active state
    if (doesJobExist.status !== constants.jobStatuses.active) {
      return res.status(400).send("This job is not accepting any more, ");
    }
    // if user has already applied to this job
    if (req.user.jobsApplied.includes(req.params.id)) {
      return res.status(400).send("You have already applied for this job, ");
    }
    req.job = doesJobExist;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error please try again later");
  }
};
