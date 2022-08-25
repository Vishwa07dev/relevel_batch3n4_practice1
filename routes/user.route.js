const userController = require('../controllers/user.controller')
const {authJwt, verifyTokens, verifyBody} = require('../middlewares')

module.exports = (app)=>{
    app.put("/job/api/v1/users/:username", [verifyTokens.userToken, authJwt.isValidUsernameInReqParam, authJwt.isAdminOrOwner, verifyBody.validateUserUpdateBody], userController.updateUser)
    app.get("/job/api/v1/users/resetpassword/:username", [authJwt.isValidUsernameInReqParam], userController.sendPasswordResetLink)
    app.put("/job/api/v1/users/resetpassword/:token", [verifyTokens.passwordReset, verifyBody.validateNewPassword], userController.resetPassword)
}