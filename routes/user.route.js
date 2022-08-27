const userController = require('../controllers/user.controller')
const {authJwt, verifyTokens, verifyUserReq} = require('../middlewares')

module.exports = (app)=>{
    app.put("/job/api/v1/users/:username", [verifyTokens.userToken, authJwt.isValidUsernameInReqParam, authJwt.isAdminOrOwner, verifyUserReq.validateUserUpdateBody], userController.updateUser)
}