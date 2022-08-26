const userController = require('../controllers/user.controller');
const {authJwt} = require('../middleware');

module.exports = (app) =>{

    app.post("/naukari/api/v1/user/:id",[authJwt.verifyToken, authJwt.isAdmin], userController.VerifyTheHR);

    app.post("/naukari/api/v1/user/apply/:jobId",[authJwt.verifyToken], userController.applyTheJob);

}