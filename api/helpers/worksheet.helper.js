
 const config = require("../configuration");
 const XLSX = require("xlsx");
 exports.createWorksheetDefault = (wb, excelData) => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    ws['!cols'] = [ 
        {wpx: 100},
        {wpx: 190},
        {wpx: 125},
        {wpx: 110},
        {wpx: 135},
        ];
  
      XLSX.utils.book_append_sheet(wb, ws, config.sheetNameSetMailExcelDefault);
      
      return ws;
  }
  
  exports.createWorksheetEasy = (wb, excelData) => {
      const ws = XLSX.utils.json_to_sheet(excelData);
      ws['!cols'] = [ 
        {wpx: 100},
        {wpx: 190},
        {wpx: 125},
        {wpx: 110},
        {wpx: 135},
        ];
  
        XLSX.utils.book_append_sheet(wb, ws, config.sheetNameSetMailExcelEasy);
      
        return ws;
    }
  
    exports.createWorksheetLogs = (wb, excelData) => {
      const ws = XLSX.utils.json_to_sheet(excelData);
      ws['!cols'] = [ 
          {wpx: 80},
          {wpx: 100},
          ];
    
        XLSX.utils.book_append_sheet(wb, ws, "logs");
        
        return ws;
}



exports.getDataForDefaultWorksheet =(sourceData, targetList) => {
    var filteredData = [];

    targetList.forEach(function (empId) {
      let prevUserId = 0;
      let prevDate = "";

      sourceData.forEach(function (excelRow) {
        const finalRow = {};
        if (excelRow['User ID'] === empId) {
          finalRow['User ID'] = excelRow['User ID'];
          finalRow['Name'] = excelRow['Name'];

          const dateVal = excelRow['Date/Time'];
          const arrDateTime = dateVal.split(" ");
          
          finalRow['Date'] = arrDateTime[0];
          const arrTime = arrDateTime[1].split(":");
          let hh = parseInt(arrTime[0]);
          let finalHH = "";
          let amPm = "AM";

          if (hh > 11) {
            amPm = "PM";

            if (hh > 12) {
              hh = hh - 12;
            } 
          }

          if (hh < 10) {
            finalHH = `0${hh}`;
          } else {
            finalHH = hh.toString();
          }

          // This is an extra row to separate between day
          if (prevUserId === empId && prevDate != finalRow['Date']){
            excelRow['User No.'] = empId;
            filteredData.push({ 
              'User ID': excelRow['User ID'],
              'Name': excelRow['Name']
            });
          }
          finalRow['Time'] =  { t: "s", v: `${finalHH}:${arrTime[1]} ${amPm}`, s: { font: {bold: true}}};

          finalRow["Device Name"] = excelRow['Device Name'];


          // if (excelRow['Device Name'] === "ENTRANCE") {
          //   finalRow['Status Description'] = "In";
          // } else {
          //   finalRow['Status Description'] = "Out";
          // }
          
          prevUserId = empId;
          prevDate = finalRow['Date'];

          filteredData.push(finalRow);
        }
      });
    });

  return filteredData;
}

exports.getDataForEasyWorksheet = (sourceData)  => {
  var retVal = [];
  var ctrRow = 0;
  sourceData.forEach((excelRow) => {
    var currRow = { UserId: excelRow["User ID"], Name: excelRow.Name, Date: excelRow.Date, Time: excelRow.Time, Device: excelRow["Device Name"]};
    var newRow = { UserId: "", Name: "", Date: "", In: "", Out: ""};
    var pushNewRow = true;

    if (ctrRow > 0) {

      var prevCtr = ctrRow - 1;
      var prevExcelRow = sourceData[prevCtr];
      var prevSourceRow = { UserId: prevExcelRow["User ID"], Name: prevExcelRow.Name, Date: prevExcelRow.Date, Time: prevExcelRow.Time, Device: prevExcelRow["Device Name"]};
      var prevRow = retVal[retVal.length - 1];

      if (currRow.UserId === prevSourceRow.UserId && currRow.Date === prevSourceRow.Date) {
        if (prevSourceRow.Device === "EXIT") {
          // Previous Row Is Out - automatic new row is filled up
            newRow.UserId = currRow.UserId;
            newRow.Name = currRow.Name;
            newRow.Date = currRow.Date;
            if (currRow.Device === "EXIT") {
              newRow.Out = currRow.Time;
            } else {
              newRow.In = currRow.Time;
            }
        } else {
          // Previous Row Is In
          if (currRow.Device === "EXIT") {
              // Current Row Is Out - fillup previous Out entry
              prevRow.Out = currRow.Time;
              pushNewRow = false;
          } else {
              // Current Row Is In - fillup new row with IN value
              newRow.UserId = currRow.UserId;
              newRow.Name = currRow.Name;
              newRow.Date = currRow.Date;
              newRow.In = currRow.Time;
          }
        }
      } else {
        newRow.UserId = currRow.UserId;
        newRow.Name = currRow.Name;
        newRow.Date = currRow.Date;
  
        if (currRow.Device === "EXIT") {
          newRow.Out = currRow.Time;
        } else {
          newRow.In = currRow.Time;
        }
      }
    } else {
      newRow.UserId = currRow.UserId;
      newRow.Name = currRow.Name;
      newRow.Date = currRow.Date;

      if (currRow.Device === "EXIT") {
        newRow.Out = currRow.Time;
      } else {
        newRow.In = currRow.Time;
      }
    }

    if (pushNewRow) {
      retVal.push(newRow);
    }
    ctrRow = ctrRow + 1;
  });

  return retVal;
}