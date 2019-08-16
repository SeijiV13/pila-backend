const config = require("../configuration");
const fileHelper = require("../helpers/file.helper");

exports.createMainExcel = (fileToRead, outputFile) => {
    const excelData = fileHelper.readFile(fileToRead, config.sheetNameRawExcel);
  
      const filteredData = [];
      const unknownData = [];
  
      excelData.forEach(function (excelRow) {
            const finalRow = {};
            const empId = excelRow["User ID"];
            const emp =  config.modelEmp.find(x => x.detnumber === empId);
  
        if (emp) {
            finalRow['User No.'] = empId;
            finalRow['User ID'] = empId;
            finalRow['Name'] = emp.name;
  
            finalRow['Date/Time'] = excelRow['Date/Time'];
  
            finalRow['Status'] = excelRow['Status'];
  
            let statusDesc = "Out"
            if (excelRow['Status'] === "0") {
              statusDesc = "In"
            }
            finalRow['Status Description'] = statusDesc;
            
            finalRow['Device No.'] = excelRow['Device No.'];
            let deviceSN = 3;
            let deviceName = "ENTRANCE";
            if (excelRow['Device No.'] === 2) {
              deviceSN = 2;
              deviceName = "EXIT";
            }
            finalRow['Device S/N'] = deviceSN;
            finalRow['Device Name'] = deviceName;
  
            filteredData.push(finalRow);
          } else {
            unknownData.push(excelRow);
          }
      });
  
      const newWb = XLSX.utils.book_new();
      const newWs = XLSX.utils.json_to_sheet(filteredData, { cellStyles: true});
      newWs['!cols'] = [ 
        {wpx: 100},
        {wpx: 100},
        {wpx: 190},
        {wpx: 125},
        {wpx: 110},
        {wpx: 75},
        {wpx: 130},
        {wpx: 90},
        {wpx: 90},
        {wpx: 135},
      ];
  
      const wsUnknwon = XLSX.utils.json_to_sheet(unknownData, { cellStyles: true});
      wsUnknwon['!cols'] = [ {wpx: 100}, {wpx: 100}, {wpx: 100}, {wpx: 100}]; 
      
      XLSX.utils.book_append_sheet(newWb, newWs, config.sheetNameMainExcel);
      XLSX.utils.book_append_sheet(newWb, wsUnknwon, config.sheetNameUnknown);
      
      XLSX.writeFile(newWb, outputFile, { cellStyles: true});
  }