const { default: mongoose } = require("mongoose");

const Company = require("../models/company.model");
const User = require("../models/user.model");
const constants = require("../utils/constants");

exports.companyStatus = async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).send("provide a valid companyId");
  }
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("you've provided an invalid companyId");
  }

  try {
    const existingCompany = await Company.findOne({
      _id: req.params.id,
    });
    if (!existingCompany) {
      return res.status(400).send("No compny exists with the given userId");
    }
    if (!req.body.status) {
      return res.status(400).send("You've to provide a status");
    }
    if (
      constants.companyVerificationStatuses[req.body.status.toLowerCase()] ==
      undefined
    ) {
      return res.status(400).send("Invalid status provided...");
    }
    if (
      existingCompany.verified ==
      constants.companyVerificationStatuses[req.body.status.toLowerCase()]
    ) {
      return res
        .status(400)
        .send("you cant provide the same status as the company already has..");
    }
    req.company = existingCompany;
    req.body.status = req.body.status.toUpperCase();
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

exports.userStatus = async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).send("provide a valid users _id");
  }
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("you've provided an invalid users _id");
  }

  try {
    const existingUser = await User.findOne({
      _id: req.params.id,
    });
    if (!existingUser) {
      return res.status(400).send("No user exists with the given users_id");
    }
    if (!req.body.status) {
      return res.status(400).send("You've to provide a status");
    }
    if (constants.userStatuses[req.body.status.toLowerCase()] == undefined) {
      return res.status(400).send("Invalid status provided...");
    }
    if (
      existingUser.userStatus ==
      constants.userStatuses[req.body.status.toLowerCase()]
    ) {
      return res
        .status(400)
        .send("you cant provide the same status as the user already has..");
    }
    req.existingUser = existingUser;
    req.body.status = req.body.status.toUpperCase();
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};
