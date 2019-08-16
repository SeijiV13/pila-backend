module.exports = function(app) {
  const excelController = require("../controllers/excel.controller");
     
     app.route('/api/generateExcel')
     .post(excelController.generate_excel);
 }