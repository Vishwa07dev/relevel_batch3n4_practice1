exports.validateApplyJobRequestBody = async (req, res, next) => {

    let { isAdmin, isHr, userStatus } = req;

    if (isAdmin) {
        return res.status(400).send({
            message: "Failed ! Admin can't apply"
        })
    }

    if (!req.params.jobid) {
        return res.status(400).send({
            message: "Failed ! Job Id is not provided"
        })
    }

    if (isHr && !userStatus) {
        return res.status(400).send({
            message: "Only Approved Hr is allowed to apply the job..!"
        });
    }


    next();
}
