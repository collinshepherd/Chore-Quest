const typeDefs = `  
type User {
    _id: ID!
    name: String!
    password: String
    age: Int
    balance: Float
    role: String
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

type Auth {
  token: ID!
  account: Account
}

type UserAuth {
  token: ID!
  user: User
}

type Task {
  _id: ID!
  taskName: String!
  assignedUser: ID
  complete: Boolean
}

type Query {
    Users: [User]
    User(name: String!): User
    UserTasks: [Task]
    Accounts: [Account]
    Account: Account
    Tasks: [Task]
    Task(_id: ID!): Task
  }
  
type Mutation {
    createAccount(familyName: String!, email: String!, password: String!): Auth
    accountLogin(email: String!, password: String!): Auth
    createUser(name: String!, password: String!, role: String!): User
    userLogin(name: String!, password: String!): UserAuth
    addTask(taskName: String!, assignedUser: ID!): Task
  }`;

module.exports = typeDefs;
