const { signToken, AuthenticationError } = require('../utils/auth')

const { mongoose } = require('mongoose')
const ObjectId = mongoose.mongo.ObjectId

const { User, Account, Task } = require('../models/index')

const resolvers = {
    Query: {
        Users: async () => {
            // Get and return all documents from the classes collection
            return await User.find({})
        },
        User: async (parent, id) => {
            // Get and return a single user from the user collection
            const user = await User.findOne({ _id: id })

            return user
        },
        UserTasks: async (parent, id) => {
            // Taking the passed id and creating that into a mongoose object id
            const userId = new ObjectId(id._id)

            // Finding all tasks the user has assigned to it
            const userTasks = await Task.find({
                assignedUser: userId,
            })

            return userTasks
        },
        Accounts: async () => {
            // Get and return all documents from the account collection
            return await Account.find({})
        },
        Account: async (parent, { id }) => {
            // Get and return a single account from the account collection
            return await Account.findOne({ _id: id })
        },
        Tasks: async () => {
            // Get and return all documents from the Task collection
            return await Task.find({})
        },
        Task: async (parent, { id }) => {
            // Get and return a single task from the task collection
            return await Task.findOne({ _id: id })
        },
    },
}

module.exports = resolvers
