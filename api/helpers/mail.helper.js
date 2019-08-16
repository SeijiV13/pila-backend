
const config = require("../configuration");
const fileHelper = require("./file.helper");
const worksheetHelper = require("./worksheet.helper");
const XLSX = require("xlsx");
exports.processSetMail = (fileToRead) => {
    const mainExcelData = fileHelper.readFile(fileToRead, config.sheetNameMainExcel);
    config.modelSetmail.forEach(function (setup) {
      const wb = XLSX.utils.book_new();
      const defaultData = worksheetHelper.getDataForDefaultWorksheet(mainExcelData, setup.targetList);
      worksheetHelper.createWorksheetDefault(wb, defaultData);
  
      const easyData = worksheetHelper.getDataForEasyWorksheet(defaultData);
      worksheetHelper.createWorksheetEasy(wb, easyData);
  
      const outputExcelFile = `${config.outputFolder}/${setup.filename}`;
      XLSX.writeFile(wb, outputExcelFile, { cellStyles: true});
    });
  }


exports.sendEmails = (targetPath, inPass) => {
    console.log(`JET Executing Send Mail`);
    exec(`start powershell "cd ${targetPath}; node node_modules\\protractor\\bin\\protractor e2e\\protractor.conf.js --params.login.password ${inPass}`, (err, stdout, stderr) => {
      // exec(`start powershell "cd ${targetPath}; npm run localprot --params ${inPass}`, (err, stdout, stderr) => {
    // exec(`start powershell "cd C:\\GIT\\JET\\ftr-tool-master; npm run e2e"`, (err, stdout, stderr) => {
      if (err) {
        console.log(`JET ${err}`);
      }
    });
  };
  