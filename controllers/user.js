const User = require("../models/user.model");
const Job = require("../models/job.model");
const constant = require("../utils/constants");

exports.applyJob = async (req, res) => {
    try {
        let jobId = req.params.jobid;
        let userId = req.id;

        const jobRes = await Job.findOne({
            _id: jobId,
            status: constant.jobStatuses.active,
        });

        jobRes.applicants.push(userId);
        await jobRes.save();

        const userRes = await User.findOne({ _id: userId });
        userRes.jobsApplied.push(userId);
        await userRes.save();

        res.status(201).send({
            message: `Job successfully applied`,
        });
    } catch (error) {
        res.status(500).send({
            message: "Some Internal Server Error",
            errorMessage: error.message,
        });
    }
};

exports.updateUserByUserId = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId });

        user.name = req.body.name ? req.body.name : user.name;

        if (req.body.userStatus || req.body.userType) {
            user.userStatus = req.body.userStatus
                ? req.body.userStatus
                : user.userStatus;
            user.userType = req.body.userType ? req.body.userType : user.userType;
        }

        const updateUser = await user.save();

        res.status(200).send({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            userId: updateUser.userId,
            userStatus: updateUser.userStatus,
            userType: updateUser.userType,
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errorMessage: error.message,
        });
    }
};
