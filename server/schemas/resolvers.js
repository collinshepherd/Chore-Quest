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
        User: async (parent, { name }) => {
            // This context.user does not actually refer to a user it is
            // referring to an individual account
            const familyId = context.user._id

            // Get and return a single user from the user collection
            const user = await User.findOne({ name: name, accountId: familyId })

            return user
        },
        UserTasks: async (parent, { _id }) => {
            // Taking the passed id and creating that into a mongoose object id
            const userId = new ObjectId(_id)

            // Finding all tasks the user has assigned to it
            const userTasks = await Task.find({
                assignedUser: userId,
            })

            return userTasks
        },
        Accounts: async () => {
            // Get and return all documents from the account collection
            return await Account.find({})
                .populate('users')
                .populate('masterList')
                .exec()
        },
        Account: async (parent, args, context) => {
            // This context.user does not actually refer to a user it is
            // referring to an individual account
            const familyId = context.user._id

            // Get and return a single account from the account collection
            return await Account.findOne({ _id: familyId })
                .populate('users')
                .populate('masterList')
                .exec()
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
    Mutation: {
        createAccount: async (parent, { familyName, email, password }) => {
            const account = await Account.create({
                familyName,
                email,
                password,
            })

            const token = signToken(account)

            return { account, token }
        },
        accountLogin: async (parent, { email, password }) => {
            const account = await Account.findOne({ email })

            if (!account) {
                console.log('no account')
                throw AuthenticationError
            }

            const correctPw = await account.isCorrectPassword(password)

            if (!correctPw) {
                console.log('no password')

                throw AuthenticationError
            }

            const token = signToken(account)

            return { account, token }
        },
        createUser: async (parent, { name, password, accountId }, context) => {
            const newUser = User.create({ name, password, accountId })

            return newUser
        },
        userLogin: async (parent, { name, password }) => {
            const user = await User.findOne({ name })

            if (!user) {
                console.log('no user')
                throw AuthenticationError
            }

            const correctPw = await user.isCorrectPassword(password)

            if (!correctPw) {
                console.log('no password')

                throw AuthenticationError
            }

            return user
        },
        addTask: async (parent, { taskName, assignedUser }) => {
            const newTask = await Task.create({
                taskName: taskName,
                assignedUser: assignedUser,
            })

            return newTask
        },
    },
}

module.exports = resolvers
