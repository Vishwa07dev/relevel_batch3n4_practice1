const authController = require('../controllers/auth.controller')
const {verifyBody, authJwt, verifyTokens} = require('../middlewares')

module.exports = (app)=>{
    app.post("/job/api/v1/auth/signup", [verifyBody.validateSignUpRequestBody], authController.signup)
    app.post("/job/api/v1/auth/signin", [verifyBody.validateSignInRequestBody], authController.signin)
    app.get("/job/api/v1/auth/verifyemail/:token", [verifyTokens.accountVerification], authController.verifyUserEmail)
    app.get("/job/api/v1/auth/resendverificationemail/:username", [authJwt.isValidUsernameInReqParam], authController.resendVerificationEmail)
}