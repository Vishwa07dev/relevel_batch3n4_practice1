const jobcontroller = require('../controllers/job.controller');
const { authJwt, jobvalidator } = require('../middlewares');

module.exports = (app) => {

    app.post("/jobPortal/api/v1/jobs/put", [authJwt.verifyToken, authJwt.isHr, jobvalidator.vadlidationOfJobReqBody], jobcontroller.createJob);

    app.post("/jobPortal/api/v1/jobs/:id", [authJwt.verifyToken, jobvalidator.isValidJobIdInParam, authJwt.isApplicant], jobcontroller.applyForJob);

    app.get("/jobPortal/api/v1/jobs/users", [authJwt.verifyToken], jobcontroller.getAllMyJObs);

    app.get("/jobPortal/api/v1/jobs", [ authJwt.verifyToken], jobcontroller.getAllJobs)

    app.get("/jobPortal/api/v1/jobs/hr", [ authJwt.verifyToken], jobcontroller.getAllJobsCreated)

    app.put("/jobPortal/api/v1/jobs/:id", [authJwt.verifyToken, authJwt.isHr], jobcontroller.updateJob);
}