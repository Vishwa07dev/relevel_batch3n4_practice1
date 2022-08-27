const jobcontroller = require('../controllers/job.controller');
const { authJwt, jobvalidator } = require('../middlewares');

module.exports = (app) => {

    app.post("/jobPortal/api/v1/jobs/create", [authJwt.verifyToken, authJwt.isHr, jobvalidator.vadlidationOfJobReqBody], jobcontroller.createJob);

    app.post("/jobPortal/api/v1/jobs/apply/:id", [authJwt.verifyToken, jobvalidator.isValidJobIdInParam, authJwt.isApplicant], jobcontroller.applyForJob);

    app.get("/jobPortal/api/v1/jobs/users", [authJwt.verifyToken], jobcontroller.getAllMyJObs);

    app.get("/jobPortal/api/v1/jobs", [ authJwt.verifyToken], jobcontroller.getAllJobs)

    app.get("/jobPortal/api/v1/jobs/created", [ authJwt.verifyToken], jobcontroller.getAllJobsCreated)

    app.put("/jobPortal/api/v1/jobs/update/:id", [authJwt.verifyToken, authJwt.isHr], jobcontroller.updateJob);
}