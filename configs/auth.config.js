if (process.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  
  module.exports = {
    secret: process.env.SECRETKEY,
  };
  