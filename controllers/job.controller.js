//this file contains the logic for handling the job creation and updation
//only admin with approved status, hr with approved status and approved companyStatus is allowed to create a job and any applicant can apply for job, unless the job is not expired.

const User = require("../models/user.model");
const Job = require("../models/job.model");
const Company = require("../models/company.model");
const { jobStatuses, userTypes, userStatuses } = require("../utils/constants");

exports.create = async (req, res) => {
  try {
    //isAdminOrHr validation already done in middleware
    //fetch the signedInUser details
    const signedInUser = await User.findOne({ userId: req.userId });

    let jobObjectToBeStoredInDB = {
      title: req.body.title,
      description: req.body.description,
      postedBy: signedInUser._id,
    };

    //check if the signedInuser is hr then take the companyId from there, else consider req.body (since admin has passed that)
    if (req.isAdmin == true) {
      jobObjectToBeStoredInDB.company = req.body.companyId;
    } else {
      jobObjectToBeStoredInDB.company = signedInUser.companyId;
    }

    const job = await Job.create(jobObjectToBeStoredInDB);

    //update the compnay jobsPosted too
    const company = await Company.findOne({ _id: job.company });
    company.jobsPosted.push(job._id);
    await company.save();

    return res.status(201).json({
      successs: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    console.error("Error while creating job ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    let queryObj = {};
    //if optional queryParam such as status=ACTIVE or EXPIRED,then apply that
    if (req.query.status) {
      queryObj.status = req.query.status;
    }
    let jobs = await Job.find(queryObj);

    const user = await User.findOne({ userId: req.userId });

    if (user.userType == userTypes.applicant) {
      jobs = jobs.map((job) => {
        return { ...job._doc, applicants: undefined };
      });
      //so applicant user cant know the ids of the other user
    }
    return res.status(200).json({
      success: true,
      documentResultsCount: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.log("Error while fetching job details.", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching the data.",
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id });
    //exclude the all job.applicant id property detail only if req.userId is applicant

    const user = await User.findOne({ userId: req.userId });
    if (user.userType == userTypes.applicant) {
      job.applicants = undefined; //so applicant user cant know the ids of the other user
    }
    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.log("Error while fetching job details.", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching the data.",
    });
  }
};

exports.update = async (req, res) => {
  //depending on userType, update is allowed
  try {
    const signedInUser = await User.findOne({
      userId: req.userId,
    });

    const job = await Job.findOne({ _id: req.params.id });
    console.log("******************");
    console.log(job);
    console.log("******************");
    //check if job status is active then only applicant(with approved status) will be able to apply for job
    if (
      signedInUser.userType === userTypes.applicant &&
      signedInUser.userStatus === userStatuses.approved
    ) {
      if (job.status === jobStatuses.expired) {
        return res.status(400).json({
          success: false,
          message: "Job is not active, its already expired.",
        });
      } else {
        //update the job and user
        job.applicants.push(signedInUser._id);
        await job.save();
        signedInUser.jobsApplied.push(job._id);
        await signedInUser.save();

        return res.status(200).json({
          success: true,
          message: "Job application is successfull.",
        });
      }
    }
    //now the signedInUser will be either owner or admin, so update is allowed, in update only job status change is allowed.
    if (req.body.status) {
      if (
        ![jobStatuses.active, jobStatuses.expired].includes(req.body.status)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Job status is not valid value.Allowed values are- ACTIVE AND EXPIRED.",
        });
      } else {
        //save the job
        job.status = req.body.status;
        job.title = req.body.title !== undefined ? req.body.title : job.title;
        job.description =
          req.body.description !== undefined
            ? req.body.description
            : job.description;

        const updatedJob = await job.save();
        return res.status(200).json({
          success: true,
          message: "Job updated is successfully done.",
          data: updatedJob,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some internal error occured.",
    });
  }
};
