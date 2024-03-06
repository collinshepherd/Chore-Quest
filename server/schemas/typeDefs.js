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
  users: [User]
  masterList: [Task]
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
    Account: Account
    AllUsersInAccount(_id: ID!): [User]
    AllTasksInAccount(_id: ID!): [Task]
    Tasks: [Task]
    Task(_id: ID!): Task
  }
  
type Mutation {
    createAccount(familyName: String!, email: String!, password: String!): Account
    accountLogin(email: String!, password: String!): Account
    createUser(name: String!, password: String!, accountId: ID!): User
    userLogin(name: String!, password: String!): User
    addTask(taskName: String!): Task
  }`

module.exports = typeDefs
