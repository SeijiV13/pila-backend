
const config = require("./configuration");
const fileHelper = require("./file.helper");
const dateStringHelper = require("./date-string.helper");
const worksheetHelper = require("./worksheet.helper");
const XLSX = require("xlsx");
exports.writeLogs = (msgCode, setId = "0") => {
    var msg = "";
    var forDevAnalysis = false;
    var fileToRead = `${config.logsFolder}/Logs.xlsx`;
    var mainExcelData = fileHelper.readFile(fileToRead, "Default");

    if (config.clearLogs) {
      mainExcelData = [];
      config.clearLogs = false;
    }

    switch(msgCode) {
      case "ES": {
        console.log(config.modelSetmail);
        var cSet =  config.modelSetmail.find(x => x.id.toString() === setId);
        console.log(cSet);
        msg = `Processing ${cSet.emailSetName}`;
        forDevAnalysis = true;
        break;
      }
      case "E0": {
        msg = `Preparing for Email Sending`;
        break;
      }
      case "E1": {
        msg = `Retrieving Data`;
        break;
      }
      case "E2": {
        msg = `Navigating to web mail`;
        break;
      }
      case "E3": {
        msg = `Logging In`;
        break;
      }
      case "E4": {
        msg = `Changing Calendar Alert Setting`;
        break;
      }
      case "E5": {
        msg = `Signing Out`;
        break;
      }
      case "E6": {
        msg = `Completed Successfully`;
        break;
      }
      default: {
        break;
      }
    }

    var msgId = 1;
    if (mainExcelData.length > 0) {
      msgId = 1 + mainExcelData.length;
    }
    
    mainExcelData.push({id: msgId, msg: msg, forDevAnalysis: forDevAnalysis, setId: setId, timestamp: dateStringHelper.getDateStringCustom(new Date())});
    
    const wb = XLSX.utils.book_new();
    worksheetHelper.createWorksheetDefault(wb, mainExcelData);

    XLSX.writeFile(wb, fileToRead, { cellStyles: true});
}

exports.readLogs = (msg) => {
  var retVal = [];
  var fileToRead = `${config.logsFolder}/Logs.xlsx`;
  var mainExcelData = fileHelper.readFile(fileToRead, "Default");

  if (mainExcelData.length > 0) {
    retVal = mainExcelData;
  }

  return retVal;
}