const Job = require("../models/job.model");
const Company = require("../models/company.model");
const constant = require("../utils/constants");

exports.createJob = async (req, res) => {
    try {

        let { title, description, companyId } = req.body;

        let postedBy = req.id;
        
        let { companyIdForUser } = req;

        let jobData = {
            title,
            description,
            postedBy,
            status: constant.jobStatuses.active,
            companyId: companyId ? companyId : companyIdForUser
        }

        const jobResponse = await Job.create(jobData);

        if (companyId) {
            let companyResp = await Company.findOne({ _id: companyId });
            companyResp.jobsPosted.push(jobResponse._id)

            await companyResp.save();

            jobResponse.company = companyResp._id
            await jobResponse.save();
        }

        res.status(201).send(jobResponse);
    } catch (error) {
        res.status
            (500).send({
                message: 'Some Internal Server Error',
                errorMessage: error.message
            })
    }
}