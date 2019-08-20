const config = require("../configuration");
module.exports = function(app) {
 const loginController = require("../controllers/login.controller");

    
    app.route(`${config.baseUrl}/login`)
    .post(loginController.login_user);

}
  
