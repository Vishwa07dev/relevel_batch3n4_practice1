
const companyContrller = require("../controller/companyController");
const {verifyCompany,authJwt} = require("../midleware");

module.exports = (app)=>{
    app.post("/job/api/v1/auth/company",[authJwt.verifyToken,verifyCompany.isAdminorHr],companyContrller.addcompany);

}