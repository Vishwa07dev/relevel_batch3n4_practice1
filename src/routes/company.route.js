const companyController = require('../controllers/company.controller');
const { authJwt, vadlidateCompanyBody } = require('../middlewares');

module.exports = (app) => {

    app.post("/jobPortal/api/v1/companies", [authJwt.verifyToken , authJwt.isAdmin, vadlidateCompanyBody.vadlidationOfCompanyBody], companyController.createCompany);

    app.get("/jobPortal/api/v1/companies", [authJwt.verifyToken , authJwt.isAdmin, ], companyController.getAllCompanies);

    app.put("/jobPortal/api/v1/companies", [authJwt.verifyToken , authJwt.isAdmin, vadlidateCompanyBody.vadlidationOfCompanyBody], companyController.updateCompany);
}