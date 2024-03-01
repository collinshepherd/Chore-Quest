const { signToken, AuthenticationError } = require('../utils/auth')

const { User } = require('../models/index')

const resolvers = {
    Query: {
        Users: async () => {
            // Get and return all documents from the classes collection
            return await User.find({})
        },
    },
}

module.exports = resolvers
