import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const configuration = require("./api/configuration");
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(configuration.corsOptions));
const PORT = 3800;


//routes
const dbRoutes = require("./api/routes/database.routes");
const logRoutes = require("./api/routes/logs.routes");
const excelRoutes = require("./api/routes/excel.routes");

dbRoutes(app);
logRoutes(app);
excelRoutes(app);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
