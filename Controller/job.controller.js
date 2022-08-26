const Job = require("../models/job.model");
const Company = require("../models/company.model");
const constants = require("../utils/constants");
const necessaryJobDetails = require("../utils/necessaryData");
exports.createJob = async (req, res) => {
  let companyId;
  if (req.user.userType == constants.userTypes.admin) {
    companyId = req.body.id;
  } else {
    companyId = req.user.companyId;
  }
  let newJobDetails = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    company: companyId,
    postedBy: req.user._id,
  };
  try {
    let jobCreated = await Job.create(newJobDetails);
    let company = await Company.findOne({ _id: companyId });
    company.jobsPosted.push(jobCreated._id);
    await company.save();
    let responseMessage = {
      title: jobCreated.title,
      description: jobCreated.description,
      status: jobCreated.status,
      company: company.name,
    };
  
    res.status(201).send({
      message: "You have successfully created a new job",
      responseMessage,
    });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .send(
        "An internal server occured when you were trying to create a new job please try again later"
      );
  }
};

// users who want to see all the listed jobs which are active
exports.findAllNecessaryJobDetails = async (req, res) => {
  try {
    let allJobs = await Job.find();
    let responseMessage = await necessaryJobDetails.necessaryJobDetails(
      allJobs
    );
    console.log(responseMessage);
    // if while running necessaryJobDetails function we incur an error we would recieve an
    // error message: "an error has occured" that means the function did not successfully run
    if (responseMessage == "an error has occured") {
      return res
        .status(500)
        .send(
          "An internal server error has occured please try again after a few seconds..."
        );
    }
    if (responseMessage == []) {
      return res
        .status(200)
        .send("No job are available for you to apply to...");
    } else {
      return res.status(200).send(responseMessage);
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(
        "An internal server error has occured please try again after a few seconds..."
      );
  }
};
// applicants applying for job
exports.applyForJob = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id });
    console.log(job);
    console.log(job.applicants);
    job.applicants.push(req.user._id);

    await job.save();
    req.user.jobsApplied.push(job._id);
    await req.user.save;
    let company = await Company.findOne({ _id: job.company });
    const jobAppliedDetails = {
      title: await job.title,
      description: await job.description,
      companyName: await company.name,
    };
    res.status(200).send({
      message: "successfully applied to the job",
      details: jobAppliedDetails,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send(
        "An internal server error seems to have occured please try again later"
      );
  }
};

// for admin all jobs ever posted on the website
exports.findAllJobs = async (req, res) => {
  try {
    let allJobs = await Job.find();
    return res.status(200).send(allJobs);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(
        "An internal server error has occured please try again after a few seconds..."
      );
  }
};

