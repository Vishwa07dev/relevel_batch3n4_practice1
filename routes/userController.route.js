const userController = require("../controller/userController");

const {authJwt} = require("../midleware");
module.exports =(app)=>{
   app.put("/job/api/v1/users/:id",[authJwt.verifyToken,authJwt.isAdmin],userController.update);
  

}
