const jobcontroller = require('../controllers/job.controller');
const { authJwt, jobvalidator } = require('../middlewares');

module.exports = (app) => {

    app.post("/jobPortal/api/v1/job/create", [authJwt.verifyToken, authJwt.isHr, jobvalidator.vadlidatejobReqBody], jobcontroller.createJob);

    app.post("/jobPortal/api/v1/job/apply/:id", [authJwt.verifyToken, authJwt.isApplicant, jobvalidator.isValidJobIdInReqParam], jobcontroller.applyForJob);

    app.get("/jobPortal/api/v1/job/", [authJwt.verifyToken], jobcontroller.getAllJObs);

    app.put("/jobPortal/api/v1/job/update/:id", [authJwt.verifyToken, authJwt.isHr], jobcontroller.updateJob);
}