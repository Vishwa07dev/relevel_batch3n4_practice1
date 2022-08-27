const userController = require('../controllers/user.controller');
const {authJwt} = require('../middleware');

module.exports = (app) =>{

    app.put("/naukari/api/v1/users/:id",[authJwt.verifyToken, authJwt.isAdmin], userController.verificationTheHr);


}