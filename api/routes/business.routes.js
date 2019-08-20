const config = require("../configuration");
const express_graphql = require("express-graphql");
const businessSchema = require("../models/business.model");
module.exports = function(app) {
 const businessModel = require("../models/business.model");

     
    app.use(`${config.baseUrl}/business`, express_graphql({
       schema: businessSchema.schema,
       rootValue: businessModel.root,
       graphiql: true
  }));
}
  
