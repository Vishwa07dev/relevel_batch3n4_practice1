const userAuthController = require("../Controller/userAuth.controller");
const allMiddlewares = require("../middleware");

module.exports = (app) => {
  app.post(
    "/naukriApp/api/v1/registrations",
    [allMiddlewares.userAUth.registration],
    userAuthController.registration
  );
  app.post(
    "/naukriApp/api/v1/logins",
    [allMiddlewares.userAUth.login],
    userAuthController.login
  );
};
