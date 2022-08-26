const allMiddlewares = {
  userAUth: require("./userAuth.middleware"),
  jobMiddleware: require("./job.middleware"),
  jwtAuth: require("./jwt.auth"),
};

module.exports = allMiddlewares;
