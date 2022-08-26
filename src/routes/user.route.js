const userController = require('../controllers/user.controller');
const { authJwt } = require('../middlewares');

module.exports = (app) => {

    app.get("/jobPortal/api/v1/users", [authJwt.verifyToken, authJwt.isAdmin], userController.findAll);

    app.get("/jobPortal/api/v1/user/:id", [authJwt.verifyToken, authJwt.isValidUserIdInReqParam ,authJwt.isAdminOrOwner,], userController.findByUserId);

    app.put("/jobPortal/api/v1/user/update/:id", [authJwt.verifyToken, authJwt.isValidUserIdInReqParam, authJwt.isAdminOrOwner], userController.update);

}