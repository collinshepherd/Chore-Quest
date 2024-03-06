const { signToken, AuthenticationError } = require('../utils/auth')

const { User, Account, Task } = require('../models/index')

const resolvers = {
    Query: {
        Users: async () => {
            // Get and return all documents from the classes collection
            return await User.find({})
        },
        User: async (id) => {
            return await User.findOne({ id })
        },
        Accounts: async () => {
            return await Account.find({})
        },
        Account: async (id) => {
            return await Account.findOne({ id })
        },
        Tasks: async () => {
            // Get and return all documents from the classes collection
            return await Task.find({})
        },
        Task: async (id) => {
            return await Task.findOne({ id })
        },
    },
}

module.exports = resolvers
