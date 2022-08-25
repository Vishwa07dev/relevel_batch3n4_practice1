const jobController = require('../controllers/job.controller');
const {verifyJob, authJwt, verifyTokens, verifyBody} = require('../middlewares')

module.exports = (app)=>{
    app.post("/job/api/v1/jobs/create", [verifyTokens.userToken, authJwt.isHr, verifyBody.validateNewJobBody], jobController.createJob);
    app.get("/job/api/v1/jobs/apply/:id", [verifyTokens.userToken, authJwt.isApplicant, verifyJob.isValidJobIdInReqParam], jobController.applyJob)
}