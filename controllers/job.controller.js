const Job = require("../models/job.model");
const User = require("../models/user.model");
const Company = require("../models/company.model")

exports.createJob = async (req, res) => {

    const jobObj = {
        title: req.body.title,
        description:  req.body.description,
    }
    const user = await User.findOne({userId: req.userId});

    if(user.userType == "APPLICANT"){
        res.status(401).send({
            message: "Can not post the Job as the UserType is not 'HR'."
        })
        return;
    }
    const jobCreated = await Job.create(jobObj);

    if (jobCreated) {
        const finduser = await User.findOne({
            userId: req.userId
        })
        console.log("*************************", finduser)
        finduser.jobsPosted.push(jobCreated._id);
        await finduser.save();
    }
    const company = await Company.find({hrs : user._id})
    console.log("********************", company)

    jobCreated.company = company._id;
    jobCreated.postedBy = user._id;
    await jobCreated.save();
       
    
    
    const response = {
        title: jobCreated.title,
        description: jobCreated.description,
    }
    
    res.status(200).send(response);

}