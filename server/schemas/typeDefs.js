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
  users: [ID]
  masterList: [ID]
}

type Task {
  _id: ID!
  taskName: String!
  assignedUser: ID
  complete: Boolean
}

type Query {
    Users: [User]
    User(_id: ID!): User
    UserTasks(_id: ID!): [Task]
    Accounts: [Account]
    Account(_id: ID!): Account
    Tasks: [Task]
    Task(_id: ID!): Task
  }`

module.exports = typeDefs
