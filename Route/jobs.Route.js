const jobController = require("../Controller/job.controller");
const { jwtAuth, jobMiddleware } = require("../middleware/index");

module.exports = (app) => {
  app.post(
    "/naukriApp/api/v1/jobCreations",
    [jwtAuth.verifyJWT, jobMiddleware.create],
    jobController.createJob
  );
  app.get(
    "/naukriApp/api/v1/findnecessaryJobDetails",
    [jwtAuth.verifyJWT],
    jobController.findAllNecessaryJobDetails
  );
  app.get(
    "/naukriApp/api/v1/applyForJobs/:id",
    [jwtAuth.verifyJWT, jobMiddleware.applyForJob],
    jobController.applyForJob
  );
};
