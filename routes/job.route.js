const jobController = require('../controllers/job.controller');
const {authJwt, verifyTokens, verifyJobReq} = require('../middlewares')

module.exports = (app)=>{
    app.post("/job/api/v1/jobs/", [verifyTokens.userToken, authJwt.isAdminOrHr, verifyJobReq.validateNewJobBody], jobController.createJob);
    app.put("/job/api/v1/jobs/:id", [verifyTokens.userToken, verifyJobReq.isValidJobIdInReqParam, verifyJobReq.validateJobUpdateBody], jobController.editJob)
}