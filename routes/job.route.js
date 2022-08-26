//this file contains the logic for addressing the  requests related to Job resource

const jobController = require("../controllers/job.controller");
const {
  isAdminOrHr,
  validateJobRequestBody,
  isValidJobIdInReqParam,
  isOwnerOrApplicantOrAdmin,
  verifyToken,
} = require("../middlewares");

module.exports = (app) => {
  app.post(
    "/naukariService/api/v1/jobs",
    [verifyToken, isAdminOrHr, validateJobRequestBody],
    jobController.create
  );

  app.get("/naukariService/api/v1/jobs", [verifyToken], jobController.findAll);

  app.get(
    "/naukariService/api/v1/jobs/:id",
    [verifyToken, isValidJobIdInReqParam],
    jobController.findOne
  );

  app.put(
    "/naukariService/api/v1/jobs/:id",
    [verifyToken, isValidJobIdInReqParam, isOwnerOrApplicantOrAdmin],
    jobController.update
  );
};
