const companyController = require("../controllers/company");
const { companyValidation } = require("../middlewares")

module.exports = (app) => {
    app.post(
        "/createcompany",
        [companyValidation.validateCompanyRequestBody],
        companyController.createCompany
    );
}