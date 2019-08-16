const config = require("../configuration");
exports.generate_excel = (req, res) => {
    config.modelAdmin = req.body.adminModel;
    config.modelSetmail = req.body.includedSets;
    config.modelEmp = req.body.allEmp;
 
   config.doorlogsFolder = `${ config.modelAdmin.rootFolder}/Doorlogs`;
   config.outputFolder = `${config.doorlogsFolder}/Output`;
   config.logsFolder = `${config.doorlogsFolder}/Logs`;
  
   const rawExcelFullPath = `${config.doorlogsFolder}/${ config.modelAdmin.doorlogsRawFile}`;
   const mainExcelFullPath = `${config.outputFolder}/${ config.modelAdmin.mainDoorLogFile}`;
   config.clearLogs = true;
 
   try {
     console.log("Creating Main Excel...");
     excelHelper.createMainExcel(rawExcelFullPath, mainExcelFullPath);
     console.log("Process Email Sets...");
     mailHelper.processSetMail(mainExcelFullPath);
     // console.log("Run Send Email...");
     mailHelper.sendEmails( config.modelAdmnn.rootFolder,  config.modelAdmin.password);
     console.log("Completed");
   } catch(err) {
     console.log(`Error ${err}`);
   }
 
   res.status(200).send({
     success: 'true',
     message: 'todos retrieved successfully',
     todos: db
   })
 }