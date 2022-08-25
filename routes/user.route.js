const userController = require("../controllers/user.controller");
const {authJwt} = require("../middlewares/index.js");

module.exports = (app) => {
    app.get("/naukri/api/v1/users", [authJwt.verifyToken, authJwt.isAdmin], userController.findAll);
    app.get("/naukri/api/v1/users/:id",[authJwt.verifyToken,authJwt.isValideUserReqParams, authJwt.isAdminOrOwner], userController.findByUserId);
    app.put("/naukri/api/v1/users/:id", [authJwt.verifyToken, authJwt.isValideUserReqParams, authJwt.isAdminOrOwner], userController.update);
}