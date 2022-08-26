//this file contains the logic for addressing  requests realted to Company resource

const {
  verifyToken,
  isAdmin,
  validateCompanyRequestBody,
  validateCompanyUpdateRequestBody,
  isValidCompanyIdInReqParam,
} = require("../middlewares");

const companyController = require("../controllers/company.controller");

module.exports = (app) => {
  //create a company
  app.post(
    "/naukariService/api/v1/companies",
    [validateCompanyRequestBody, verifyToken, isAdmin],
    companyController.create
  );

  //fetch all the companies
  app.get(
    "/naukariService/api/v1/companies",
    [verifyToken, isAdmin],
    companyController.findAll
  );

  //fetch specific company
  app.get(
    "/naukariService/api/v1/companies/:id",
    [verifyToken, isAdmin, isValidCompanyIdInReqParam],
    companyController.findOne
  );

  //udpate specific company
  app.put(
    "/naukariService/api/v1/companies/:id",
    [
      validateCompanyUpdateRequestBody,
      verifyToken,
      isAdmin,
      isValidCompanyIdInReqParam,
    ],
    companyController.update
  );
};
