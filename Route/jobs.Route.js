const jobController = require("../Controller/job.controller");
const { jwtAuth, jobMiddleware } = require("../middleware/index");

module.exports = (app) => {
  app.post(
    "/naukriApp/api/v1/jobs",
    [jwtAuth.verifyJWT, jobMiddleware.create],
    jobController.createJob
  );
  app.get(
    "/naukriApp/api/v1/jobDetails",
    [jwtAuth.verifyJWT],
    jobController.findAllNecessaryJobDetails
  );

  app.put(
    "/naukriApp/api/v1/applyJobs/:id",
    [jwtAuth.verifyJWT, jobMiddleware.applyForJob],
    jobController.applyForJob
  );

  app.get(
    "/naukriApp/api/v1/allJobs",
    [jwtAuth.verifyJWT, jwtAuth.isAdmin],
    jobController.findAllJobs
  );
};
