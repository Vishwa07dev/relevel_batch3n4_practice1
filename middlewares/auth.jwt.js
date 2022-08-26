//This middleware file is related to authentication and authorization of the user.
//Authentication done by verifying the access token passed in headers ,which usually send along with the request.
//Authorization done by validating if user is allowed to access particular request on the particular resource or not.

const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const {
  userTypes,
  userStatuses,
  companyVerificationStatuses,
} = require("../utils/constants");
const User = require("../models/user.model");
const Company = require("../models/company.model");
const Job = require("../models/job.model");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  //check token is passed with the request or not
  if (!token) {
    //forbidden-403 http status
    return res.status(403).json({
      success: false,
      message: "No Token provided. Access Prohibited.",
    });
  }
  //token has been passed, validate the passed token
  jwt.verify(token, authConfig.secret, (error, decoded) => {
    if (error) {
      console.log(error);
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }
    //decoded object will be having the payload that was given during the jwt (token) creation
    //extracting id from the decoded payload and assign it as property in request object, so specific user can be accessed in this request processing pipeline
    req.userId = decoded.id;

    //pass the control to next
    next();
  });
};

//to validate the given userType is admin or not and userStatus is approved too,then only able to access
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      userId: req.userId,
      userStatus: userStatuses.approved,
    });
    if (user && user.userType === userTypes.admin) {
      //if userType is admin, pass the control to next
      next();
    } else {
      //access not allowed
      return res.status(403).json({
        success: false,
        message:
          "No access allowed to the user for this requested endpoint. ADMIN WITH APPROVED STATUS only allowed",
      });
    }
  } catch (error) {
    console.error("Internal server error", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching the data. ",
    });
  }
};

//to validate given user is AdminwithApprovedStatus(all access) or HR(with approved status and approved companyStatus too, so able to access)

const isAdminOrHr = async (req, res, next) => {
  try {
    const user = await User.findOne({
      userId: req.userId,
      userStatus: userStatuses.approved,
    });
    if (user && user.userType === userTypes.admin) {
      //if userType is admin, pass the control to next
      //adding an extra key to req so when admin user tries to create a job,it can be used
      req.isAdmin = true;
      next();
    } else if (user && user.userType === userTypes.hr) {
      //if usertype is hr, check whether the companyID is listed in the hr records or not
      const companyId = user.companyId;
      if (!companyId) {
        return res.status(403).json({
          success: false,
          message:
            "No access allowed to the user for this requested endpoint. No Company is listed in your record.",
        });
      } else {
        //means companyID is listed in the hr records,ensure whether the company verified having approved status or not
        const company = await Company.findOne({
          _id: user.companyId,
          verified: companyVerificationStatuses.approved,
        });
        if (!company) {
          return res.status(403).json({
            success: false,
            message:
              "No access allowed to the user for this requested endpoint. The Company is not having approved status.Contact admin for more details.",
          });
        } else {
          //all validation passed,
          next();
        }
      }
    } else {
      //access not allowed,user is other than admin or hr
      return res.status(403).json({
        success: false,
        message:
          "No access allowed to the user for this requested endpoint. ADMIN WITH APPROVED STATUS only allowed or HR  WITH APPROVED STATUS along with Company VerifiedStatus as Approved.",
      });
    }
  } catch (error) {
    console.error("Internal server error", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching the data. ",
    });
  }
};

//to validate given user is Admin(with Approved Status)(all access) or Owner(userId belongs to the user only, so able to access)
//user.userType==="ADMIN" -> for admin user
//user.userId === req.userId;-> for owner user
const isAdminOrOwner = async (req, res, next) => {
  //to check whether user is approved admin or user is owner only,
  try {
    const signedInUser = await User.findOne({
      userId: req.userId,
    });
    if (
      signedInUser &&
      ((signedInUser.userType === userTypes.admin &&
        signedInUser.userStatus === userStatuses.approved) ||
        signedInUser.userId === req.params.id)
    ) {
      //means the user is either admin(with approved status) or owner only
      next(); //pass the control
    } else {
      //not a valid user to access this endpoint
      return res.status(403).json({
        success: false,
        message:
          "No access allowed to the user for this requested endpoint.ADMIN (with approved Status) or Owner only allowed.",
      });
    }
  } catch (error) {
    console.error("Internal server error", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching the data. ",
    });
  }
};

const isOwnerOrApplicantOrAdmin = async (req, res, next) => {
  //ensure if the user is owner (means job is created by this user, then this user can only update or Admin user can update job, also applicant can update the job(but only applicants))

  const job = await Job.findOne({ _id: req.params.id });

  const signedInUser = await User.findOne({ userId: req.userId });

  if (signedInUser.userType === userTypes.hr) {
    //check whether the signedInUser is the hr and is the owner of the current job
    if (job.postedBy !== signedInUser._id) {
      return res.status(403).json({
        success: false,
        message:
          "Only the owner of this Job or Admin or Applicant with approved status is allowed to update the job.",
      });
    }
  } else if (
    signedInUser.userType === userTypes.applicant ||
    signedInUser.userType === userTypes.admin
  ) {
    //applicant the user must be approved status
    if (signedInUser.userStatus !== userStatuses.approved) {
      return res.status(403).json({
        success: false,
        message:
          "Only the owner of this Job or Admin or Applicant with approved status is allowed to update the job.",
      });
    }
  } else if (
    signedInUser.userType === userTypes.applicant &&
    signedInUser.userStatus !== userStatuses.approved
  ) {
    //ensure whether the user applicant has been already applied for job, if true  then return from here only
    const user = await User.findOne({ userId: req.userId });
    if (job.applicants.includes(user._id)) {
      return res.status(400).json({
        success: false,
        message:
          "Applicant user already has been applied for the job.You can't apply a single job again.",
      });
    }
  }
  //all validations passed
  next();
};
module.exports = {
  verifyToken,
  isAdmin,
  isAdminOrHr,
  isAdminOrOwner,
  isOwnerOrApplicantOrAdmin,
};
