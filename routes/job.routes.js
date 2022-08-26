const jobController = require('../controllers/job.controller');
const {authJwt, jobValidator} = require('../middleware');

module.exports = (app) =>{

    app.post("/naukari/api/v1/job/create",[authJwt.verifyToken, jobValidator.validateJob], jobController.CreateJob);

    app.get("/naukari/api/v1/job", jobController.findAllJobs);

}