const allMiddlewares = {
  userAUth: require("./userAuth.middleware"),
  jobMiddleware: require("./job.middleware"),
  jwtAuth: require("./jwt.auth"),
  companyMiddleware: require("./company.middleware"),
  approveMiddleware: require("./approvals.middleware"),
};

module.exports = allMiddlewares;
