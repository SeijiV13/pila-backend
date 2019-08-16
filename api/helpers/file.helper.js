

const XLSX = require("xlsx");
exports.readFile = (fileToRead, sheetName) => {
    const wb = XLSX.readFile(fileToRead, { cellDates: true });
    const ws = wb.Sheets[sheetName];
    const rawData = XLSX.utils.sheet_to_json(ws);
    
    return rawData;
}
  