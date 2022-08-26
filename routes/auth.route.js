
const authController = require("../controller/authController");
const {verifySignUp} = require("../midleware");

module.exports = (app)=>{
    app.post("/job/api/v1/auth/signup",[verifySignUp.validateSignUpRequestBody],authController.signup);

    // LOGIN

 app.post("/job/api/v1/auth/signin",[verifySignUp.validateSigninRequestBody],authController.signin);
}