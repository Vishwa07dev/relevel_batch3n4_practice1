const jobController = require('../controllers/job.controller');
const userController = require('../controllers/user.controller');
const {authJwt, jobValidator} = require('../middleware');

module.exports = (app) =>{

    app.post("/naukari/api/v1/job/create",[authJwt.verifyToken, jobValidator.validateJob], jobController.createJob);

    app.get("/naukari/api/v1/job", jobController.findAllJobs);

    app.put("/naukari/api/v1/user/job/:jobId",[authJwt.verifyToken], userController.applyTheJob);

}