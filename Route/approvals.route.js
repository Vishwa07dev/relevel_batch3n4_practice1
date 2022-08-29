const { jwtAuth, approveMiddleware } = require("../middleware/index");
const approvalController = require("../Controller/approvals.controlller");

module.exports = (app) => {
  app.put(
    "/naukriApp/api/v1/approvalCompanies/:id",
    [jwtAuth.verifyJWT, jwtAuth.isAdmin, approveMiddleware.companyStatus],
    approvalController.companyStatus
  );
  app.put(
    "/naukriApp/api/v1/approvalUsers/:id",
    [jwtAuth.verifyJWT, jwtAuth.isAdmin, approveMiddleware.userStatus],
    approvalController.userStatus
  );
};
