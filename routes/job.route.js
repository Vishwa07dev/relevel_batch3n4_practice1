
const jobController = require("../controller/jobController");
const {verifyCompany,authJwt,verifyJobBody} = require("../midleware");

module.exports =(app)=>{
   app.post("/job/api/v1/jobs",[authJwt.verifyToken,verifyCompany.isAdminorHr,verifyJobBody.validateJobBody],jobController.createJob);

   app.put("/job/api/v1/jobs/:id",[authJwt.verifyToken],jobController.applyJob)

}

