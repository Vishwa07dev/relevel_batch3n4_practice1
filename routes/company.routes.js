const companyController = require('../controllers/company.controller');
const {authJwt} = require('../middleware');

module.exports = (app) =>{

    app.post("/naukari/api/v1/company/create",[authJwt.verifyToken, authJwt.isAdmin] , companyController.createCompany);

    app.get("/naukari/api/v1/company/companies",[authJwt.verifyToken], companyController.findAllCompanies);

    app.put("/naukari/api/v1/company/:id",[ authJwt.verifyToken, authJwt.isAdmin] ,companyController.verifyTheCompany);

}