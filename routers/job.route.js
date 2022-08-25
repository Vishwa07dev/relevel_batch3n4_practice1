const jobController = require("../controllers/job");
const { authJwtVerify, postJobValidation, companyValidation } = require("../middlewares")

module.exports = (app) => {
    app.post(
        "/postjob",
        [
            authJwtVerify.verifyToken,
            postJobValidation.validatePostJobRequestBody,
            companyValidation.validateCompany
        ],
        jobController.createJob
    );
}