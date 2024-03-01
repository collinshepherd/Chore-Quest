const typeDefs = `  
type User {
    _id: ID
    username: String!
    email: String!
    password: String!
  }

type Query {
    Users: [User]
  }`

module.exports = typeDefs
