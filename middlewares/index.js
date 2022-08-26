const verifyReqBody = require("./auth");
const authJwtVerify = require("./authJwtVerify");
const postJobValidation = require("./postJobValidation");
const applyJobValidation = require("./applyJobValidation");
const companyValidation = require("./companyValidation");
const jobValidation = require("./jobValidation");

module.exports = {
    verifyReqBody,
    authJwtVerify,
    postJobValidation,
    applyJobValidation,
    companyValidation,
    jobValidation
}