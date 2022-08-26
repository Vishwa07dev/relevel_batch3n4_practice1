const jobController = require("../Controller/job.controller");
const { jwtAuth, jobMiddleware } = require("../middleware/index");

module.exports = (app) => {
  app.post(
    "/naukriApp/api/v1/jobCreation",
    [jwtAuth.verifyJWT, jobMiddleware.create],
    jobController.createJob
  );
  app.get(
    "/naukriApp/api/v1/findnecessaryJobDetails",
    [jwtAuth.verifyJWT],
    jobController.findAllNecessaryJobDetails
  );
  app.get(
    "/naukriApp/api/v1/applyForJob/:id",
    [jwtAuth.verifyJWT, jobMiddleware.applyForJob],
    jobController.applyForJob
  );
};
