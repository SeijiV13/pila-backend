import express from 'express';
import db from './db/db';
const app = express();
import bodyParser from 'body-parser';
import * as XLSX from 'xlsx';
import cors from 'cors';

function setXlsx(adminModel) {
    const fileToRead = `${adminModel.rootFolder}/${adminModel.doorlogsRawFile}`;
    const outputFolder = `${adminModel.rootFolder}/Output`;
 
    const wb = XLSX.readFile(fileToRead, { cellDates: true });
    const ws = wb.Sheets['Sheet1'];
    const rawData = XLSX.utils.sheet_to_json(ws);
    return {outputFolder: outputFolder, rawData: rawData};
 }

function createExcelFilePerLead(adminModel, emailSetups, coverage) {
    const dataXlsx = setXlsx(adminModel);
    emailSetups.forEach(function (setup) {
      const outputExcelFile = `${dataXlsx.outputFolder}/${setup.emailSetName} ${coverage}.xlsx`;

      const filteredData = [];
      setup.rcList.forEach(function (empId) {
        dataXlsx.rawData.forEach(function (excelRow) {
          if (excelRow['User ID'] === empId) {
            filteredData.push(excelRow);
          }
        });
      });

      const newWb = XLSX.utils.book_new();
      const newWs = XLSX.utils.json_to_sheet(filteredData, { dateNF: 'M/DD/YYYY HH:mm' });
      XLSX.utils.book_append_sheet(newWb, newWs, 'Team Time Logs');
      XLSX.writeFile(newWb, outputExcelFile);
    });
}
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
 app.post('/api/generateExcel', (req, res) => {
  createExcelFilePerLead(req.body.adminModel, req.body.emailSetups, req.body.coverage);
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
    todos: db
  })
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});