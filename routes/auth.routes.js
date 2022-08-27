const authController = require('../controllers/auth.controller');
const {verifySignUp} = require('../middleware');

module.exports = (app) =>{

    app.post("/naukari/api/v1/auth/signup",[verifySignUp.validateSignUpRequestBody], authController.signUp);

    app.post("/naukari/api/v1/auth/signin",[verifySignUp.validateSignInRequestBody], authController.signIn);

}