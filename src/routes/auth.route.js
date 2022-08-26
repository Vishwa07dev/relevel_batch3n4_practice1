const authController = require('../controllers/auth.controller');
const { verifySignUpAndSignIn } = require('../middlewares');

module.exports = (app) => {
    /**
     * for signUp
     * 
     * Post request
     */
    app.post("/jobPortal/api/v1/auth/signup", [verifySignUpAndSignIn.validateSignUpRequestBody], authController.signup);

    /**
     * signIn 
     * 
     * Post request
     */
    app.post("/jobPortal/api/v1/auth/signin", [verifySignUpAndSignIn.validateSignInRequestBody], authController.signin);
}