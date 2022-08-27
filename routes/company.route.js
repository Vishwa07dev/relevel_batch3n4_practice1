const companyController = require('../controllers/company.controller');
const {authJwt, verifyTokens, verifyCompanyReq} = require('../middlewares')

module.exports = (app)=>{
    app.post("/job/api/v1/company", [verifyTokens.userToken, authJwt.isAdmin, verifyCompanyReq.validateNewCompanyBody], companyController.createCompany);
    app.put("/job/api/v1/company/:id", [verifyTokens.userToken, authJwt.isAdmin, verifyCompanyReq.isValidCompanyIdInReqParam], companyController.updateCompany)
}