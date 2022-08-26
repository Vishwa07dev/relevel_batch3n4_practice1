const companyController = require("../controllers/company.controller");
const {authJwt} = require("../middlewares/index.js");

module.exports = (app) => {
    app.get("/naukri/api/v1/companies", [authJwt.verifyToken, authJwt.isAdmin], companyController.findAllCompany);
    app.get("/naukri/api/v1/companies/:id", [authJwt.verifyToken,authJwt.isValideUserReqParams, authJwt.isAdminOrCompanyAdmin], companyController.findCompanyById);
    app.put("/naukri/api/v1/companies/:id", [authJwt.verifyToken,authJwt.isValideUserReqParams, authJwt.isAdminOrCompanyAdmin], companyController.updateCompanyDetails);

    app.post("/naukri/api/v1/company",[authJwt.verifyToken], companyController.createCompany);
}