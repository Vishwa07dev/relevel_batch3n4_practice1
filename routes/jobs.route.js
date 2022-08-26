const jobController = require("../controllers/job.Controller")
const {verifyToken} = require("../middlewears/authJWT")


module.exports = (app) => {
    
    app.post("/jobportal/api/v1/job", verifyToken, jobController.createJob)
    
    
}