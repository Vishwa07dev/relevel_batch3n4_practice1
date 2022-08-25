const constant = require("../utils/constants");
const Job = require("../models/job.model");
const User = require("../models/user.model");

exports.validateJob = async (req, res, next) => {

    if (req.params.jobid) {

        let jobResponse = await Job.findOne({ _id: req.params.jobid });

        if (jobResponse && jobResponse.status !== constant.jobStatuses.active) {
            return res.status(400).send({
                message: "Failed ! Job expired"
            })
        } else if (!jobResponse) {
            return res.status(400).send({
                message: "Failed ! No Job is found with id " + req.params.jobid
            })
        }

        if (jobResponse.applicants.includes(req.id)) {
            return res.status(400).send({
                message: `Already Applied`
            });
        }

        let userResponse = await User.findOne({ _id: jobResponse.postedBy });

        if (userResponse && String(userResponse._id) === String(req.id)) {
            return res.status(400).send({
                message: "Failed ! You can't apply, you are the one POSTED THIS JOB..!"
            })
        }
    }


    next();
}
