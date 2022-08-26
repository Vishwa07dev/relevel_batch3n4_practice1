const userAuthController = require("../Controller/userAuth.controller");
const allMiddlewares = require("../middleware");

module.exports = (app) => {
  app.post(
    "/naukriApp/api/v1/registration",
    [allMiddlewares.userAUth.registration],
    userAuthController.registration
  );
  app.post(
    "/naukriApp/api/v1/login",
    [allMiddlewares.userAUth.login],
    userAuthController.login
  );
};
