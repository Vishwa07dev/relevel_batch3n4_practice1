const bcrypt = require("bcrypt");
const uuid = require("uuid");
const Company = require("../models/company.model");

const constants = require("../utils/constants");
const User = require("../models/user.model");
const { default: mongoose } = require("mongoose");

exports.registration = async (req, res, next) => {
  // console.log("FirstStep");
  // name validation
  if (!req.body.name) {
    return res.status(400).send("You have to provide a name!");
  }
  // check to see if req.body.name only has alphabets and no numbers or space
  if (!constants.nameCheck.test(req.body.name)) {
    return res
      .status(400)
      .send(
        "You have to provide a valid name,  it cannot have spaces or numbers or special characters!"
      );
  }
  // check if email is provided
  if (!req.body.email) {
    return res.status(400).send("You have to provide a valid emailId!");
  }
  // email validity check
  if (req.body.email) {
    if (!constants.emailRegex.test(req.body.email)) {
      return res.status(400).send("You have to provide a valid emailId!");
    } else {
      // email-unique check
      try {
        let uniqueEmailCheck = await User.findOne({ email: req.body.email });
        if (uniqueEmailCheck) {
          return res
            .status(400)
            .send(
              "This email is already registered with us , try loging in instead"
            );
        }
      } catch (err) {
        console.log(err.message);
        return res
          .status(500)
          .send(
            "Internal server error has occured while registration please try again later...."
          );
      }
    }
  } // check if password is provided
  if (!req.body.password) {
    return res.status(400).send("You have to provide a valid password");
  } // check whether password has Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
  if (req.body.password) {
    if (!constants.passwordCheck.test(req.body.password)) {
      return res
        .status(400)
        .send(
          "you have to provide a password with Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
        );
    }
  }
  //   check if userType has been provided
  if (!req.body.userType) {
    req.body.userType = constants.userTypes.applicant;
  }
  if (req.body.userType) {
    req.body.userType = req.body.userType.toUpperCase();
    if (
      // userType check to ensure it is either hr or student
      constants.userTypes[req.body.userType.toLowerCase()] == undefined ||
      constants.userTypes[req.body.userType.toLowerCase()] == "ADMIN"
    ) {
      return res
        .status(400)
        .send("You can register only as an Hr or Applicant");
    }
    // if user is an hr check whether they provided a valid CompanyId
    if (req.body.userType == constants.userTypes.hr) {
      if (!req.body.companyId) {
        return res
          .status(400)
          .send(
            "You can register only as an Hr if you provide a valid companyId"
          );
      } else {
        if (mongoose.isValidObjectId(req.body.companyId)) {
          try {
            // check if company with the provided id exists
            let validCompanyId = await Company.findOne({
              _id: req.body.companyId,
            });
            if (!validCompanyId) {
              return res
                .status(400)
                .send("You haven't provided a valid companyId");
            }
          } catch (err) {
            console.log(err.message);
            return res
              .status(500)
              .send(
                "An internal server error has occured, please try again later"
              );
          }
        } else {
          return res
            .status(400)
            .send(
              "You can register only as an Hr if you provide a valid companyId, the id provided is invalid"
            );
        }
      }
    }
  } // if a non hr tries to assign themself a company
  if (req.body.userType == constants.userTypes.applicant) {
    req.body.companyId = undefined;
  }

  // provide a unique userId for each user
  req.body.userId = uuid.v4();
  next();
};

exports.login = async (req, res, next) => {
  // login is done based on email and password
  //email validation
  if (!req.body.email) {
    return res.status(400).send("You have to provide a valid email to login");
  }
  if (constants.emailRegex.test(req.body.email)) {
    req.user = await User.findOne({ email: req.body.email });
  } else {
    return res.status(400).send("You have to provided a invalid email.");
  }
  if (req.user == undefined) {
    return res
      .status(400)
      .send("You have to provide a valid, registerd email to login");
  }
  // password validation
  if (!req.body.password) {
    return res
      .status(400)
      .send("You have to provide a valid password to login");
  }
  if (!bcrypt.compareSync(req.body.password, req.user.password)) {
    return res.status(400).send("Incorect password for this user");
  }
  //userType validation
  // if user is  unapproved  dont let them log in
  if (req.user.userStatus !== constants.userStatuses.approved) {
    return res
      .status(400)
      .send("you are not allowed to login... go to our website to know more");
  }
  next();
};
