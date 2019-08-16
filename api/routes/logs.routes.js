module.exports = function (app) {
   const logsController = require("../controllers/logs.controller");
   
   app.route("/api/getLogs")
   .get(logsController.get_logs);

   app.route("/api/writeLogs")
   .get(logsController.write_logs);
}

