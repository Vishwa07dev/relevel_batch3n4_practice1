const verifySignUp = require("./verifySignUp");
const authJwt = require("./authJWT");
const verifyCompany = require("./companyValidatore");
const verifyJobBody = require("./verifyJobBody");
module.exports = {
    verifySignUp,
    authJwt,
    verifyCompany,
    verifyJobBody
    
}