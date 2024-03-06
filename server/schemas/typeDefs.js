const typeDefs = `  
type User {
    _id: ID!
    name: String!
    password: String
    age: Int
    balance: Float
    roles: [String]
    accountId: ID
  }

type Account {
  _id: ID!
  familyName: String!
  email: String!
  password: String!

}

type Task {
  listName: String!
  tasks: [String]!
  value: Int
  description: String
  ageRange: ID
}

type Query {
    Users: [User]
    User(_id: ID!): User
    Accounts: [Account]
    Account(_id: ID!): Account
    Tasks: [Task]
    Task(_id: ID!): Task
  }`

module.exports = typeDefs
