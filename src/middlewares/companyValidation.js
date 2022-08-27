const vadlidationOfCompanyBody = async (req, res, next) => {

    try{

        if (!req.body.name) {
            return res.status(400).send({
                message: "Failed ! company name is not provided"
            });
        }
        if (!req.body.address) {
            return res.status(400).send({
                message: "Failed ! company address is not provided"
            });
        }
        if (!req.body.verified) {
            return res.status(400).send({
                message: "Failed ! company is not verified"
            });
        }

        next();
    } catch (err) {
        console.log("error while validating company body ", err.message);
        res.status(500).send({
            message : "Internal server error"
        });
    }
}

module.exports = {
    vadlidationOfCompanyBody : vadlidationOfCompanyBody
}