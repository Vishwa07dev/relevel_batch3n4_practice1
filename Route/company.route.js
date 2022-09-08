const { companyMiddleware, jwtAuth } = require("../middleware/index");
const companyController = require("../Controller/company.controller");

module.exports = (app) => {
  app.post(
    "/naukriApp/api/v1/companies",
    [jwtAuth.verifyJWT, jwtAuth.isAdmin, companyMiddleware.create],
    companyController.create
  );
};
