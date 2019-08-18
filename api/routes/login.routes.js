module.exports = function(app) {
 const loginController = require("../controllers/login.controller");
    
    app.route('/api/login')
    .post(loginController.login_user);
}