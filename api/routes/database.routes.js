module.exports = function(app) {
 const dbController = require("../controllers/database.controller");
    
    app.route('/api/dbstart')
    .post(dbController.start_db);
}