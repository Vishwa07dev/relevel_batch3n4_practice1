const authController = require("../controllers/auth");
const { verifyReqBody } = require("../middlewares")

module.exports = (app) => {
    app.post(
        "/signup",
        [verifyReqBody.validateSignUpRequestBody],
        authController.signup
    );

    app.post(
        "/signin",
        [verifyReqBody.validateSignInRequestBody],
        authController.signin
    );
}