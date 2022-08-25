exports.validatePostJobRequestBody = async (req, res, next) => {

    if (!req.body.title) {
        return res.status(400).send({
            message: "Failed ! title is not provided"
        })
    }

    if (!req.body.description) {
        return res.status(400).send({
            message: "Failed ! description is not provided"
        })
    }

    let { isAdmin, isHr, userStatus } = req;

    if (!isAdmin && !isHr) {
        return res.status(400).send({
            message: "Only HR's & Admin's are allowed to post the job..!"
        });
    }

    if (!userStatus) {
        return res.status(400).send({
            message: "Only approved HR's & Admin's are allowed to post the job..!"
        });
    }


    next();
}
