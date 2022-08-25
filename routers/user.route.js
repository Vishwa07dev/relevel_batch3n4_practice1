const userController = require("../controllers/user");
const { authJwtVerify, applyJobValidation, jobValidation } = require("../middlewares")

module.exports = (app) => {
    app.put(
        "/user/:userId",
        [
            authJwtVerify.verifyToken,
            authJwtVerify.checkIsValidUserId,
            authJwtVerify.checkIsAdmin
        ],
        userController.updateUserByUserId
    )

    app.post(
        "/applyjob/:jobid",
        [
            authJwtVerify.verifyToken,
            applyJobValidation.validateApplyJobRequestBody,
            jobValidation.validateJob
        ],
        userController.applyJob
    );
}