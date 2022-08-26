const jobcontroller = require('../controllers/job.controller');
const { authJwt, jobvalidator } = require('../middlewares');

module.exports = (app) => {

    app.post("/jobPortal/api/v1/job/create", [authJwt.verifyToken, authJwt.isHr, jobvalidator.vadlidatejobReqBody], jobcontroller.createJob);

    app.post("/jobPortal/api/v1/job/apply/:id", [authJwt.verifyToken, jobvalidator.isValidJobIdInReqParam, authJwt.isApplicant], jobcontroller.applyForJob);

    app.get("/jobPortal/api/v1/jobs/users", [authJwt.verifyToken], jobcontroller.getAllMyJObs);

    app.get("/jobPortal/api/v1/jobs", [ authJwt.verifyToken], jobcontroller.getAllJobs)

    app.get("/jobPortal/api/v1/jobs/created", [ authJwt.verifyToken], jobcontroller.getAllJobsCreated)

    app.put("/jobPortal/api/v1/job/update/:id", [authJwt.verifyToken, authJwt.isHr], jobcontroller.updateJob);
}