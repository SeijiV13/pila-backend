var { buildSchema } = require('graphql');
const businessService = require("../services/business.service");
// GraphQL schema
exports.schema = buildSchema(`
  type Query {
     getBusiness(id: Int!): Business
     getAllBusiness(topic: String): [Business]
    },
  type Business {
     id: Int
     name: String,
     userId: String
     category: String
     logoImageUrl: String
     dateCreated: String
     dateModified: String
    }
`);

exports.root = {
  getBusiness: businessService.getBusiness,
  getAllBusiness: businessService.getAllBusiness
}