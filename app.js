const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const configuration = require("./api/configuration");
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(configuration.corsOptions));
const PORT = 3800;


//routes
const loginRoutes = require("./api/routes/login.routes");
const businessRoutes =require("./api/routes/business.routes");
businessRoutes(app);
loginRoutes(app);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
