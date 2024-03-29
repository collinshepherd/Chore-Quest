const { signToken, AuthenticationError } = require('../utils/auth');
const { GraphQLError } = require('graphql')
const { mongoose } = require('mongoose');
const ObjectId = mongoose.mongo.ObjectId;

const { User, Account, Task } = require('../models/index');

const resolvers = {
    Query: {
        Users: async () => {
            // Get and return all documents from the classes collection
            return await User.find({});
        },
        User: async (parent, { name, _id }, context) => {
            // This context.user does not actually refer to a user it is
            // referring to an individual account
            const familyId = context.user.familyId;
            let user;

            // Get and return a single user from the user collection
            if (name) {
                user = await User.findOne({
                    name: name,
                    accountId: familyId,
                });
            } else {
                user = await User.findOne({
                    _id: _id,
                });
            }
            return user;
        },
        UserTasks: async (parent, args, context) => {
            // Taking the passed id and creating that into a mongoose object id
            const userId = context.user.userId;

            // Finding all tasks the user has assigned to it
            const userTasks = await Task.find({
                assignedUser: userId,
            });

            return userTasks;
        },
        Accounts: async () => {
            // Get and return all documents from the account collection
            return await Account.find({})
                .populate('users')
                .populate('masterList')
                .exec();
        },
        Account: async (parent, args, context) => {
            // This context.user does not actually refer to a user it is
            // referring to an individual account
            const familyId = context.user.familyId;

            // Get and return a single account from the account collection
            return await Account.findOne({ _id: familyId })
                .populate('users')
                .populate('masterList')
                .exec();
        },
        Tasks: async () => {
            // Get and return all documents from the Task collection
            return await Task.find({});
        },
        Task: async (parent, { id }) => {
            // Get and return a single task from the task collection
            return await Task.findOne({ _id: id });
        },
    },
    Mutation: {
        createAccount: async (parent, { familyName, email, password }) => {
            const emailExists = await Account.findOne({email})
            // console.log(emailExists)
            if (emailExists) {
                throw new GraphQLError('Email already exists!', {})
            }

            const newAccount = await Account.create({
                familyName,
                email,
                password,
            });

            // need to destructure account and pass email, familyName, Id
            const account = {
                familyName: newAccount.familyName,
                email: newAccount.email,
                familyId: newAccount._id,
            };
            const token = signToken(account);

            return { account: newAccount, token };
        },
        accountLogin: async (parent, { email, password }) => {
            const account = await Account.findOne({ email });

            if (!account) {
                console.log('no account');
                throw AuthenticationError;
            }

            const correctPw = await account.isCorrectPassword(password);

            if (!correctPw) {
                console.log('no password');

                throw AuthenticationError;
            }

            const alteredAccount = {
                familyName: account.familyName,
                email: account.email,
                familyId: account._id,
            };

            const token = signToken(alteredAccount);

            return { account, token };
        },
        createUser: async (parent, { name, password, role }, context) => {
            const familyId = context.user.familyId;

            const user = await User.create({
                name,
                password,
                role,
                accountId: familyId,
            });

            await Account.findOneAndUpdate(
                {
                    _id: familyId,
                },
                {
                    $push: { users: user._id },
                }
            );

            return user;
        },
        userLogin: async (parent, { name, password }, context) => {
            const payloadData = context.user;

            const newUser = await User.findOne({
                name: name,
                accountId: payloadData.familyId,
            });

            if (!newUser) {
                console.log('no user');
                throw AuthenticationError;
            }

            const correctPw = await newUser.isCorrectPassword(password);

            if (!correctPw) {
                console.log('no password');

                throw AuthenticationError;
            }

            const newPayload = {
                ...payloadData,
                firstName: newUser.name,
                userId: newUser._id,
                role: newUser.role,
            };

            const token = signToken(newPayload);

            return { user: newUser, token };
        },
        addTask: async (parent, { taskName, assignedUser }, context) => {
            const newTask = await Task.create({
                taskName: taskName,
                assignedUser: assignedUser,
            });

            await Account.findOneAndUpdate(
                {
                    _id: context.user.familyId,
                },
                {
                    $push: { masterList: newTask._id },
                }
            );

            return newTask;
        },
        completeTask: async (parent, { _id }) => {
            const updatedTask = await Task.findOneAndUpdate(
                {
                    _id: _id,
                },
                {
                    complete: true,
                },
                {
                    new: true,
                }
            );

            return updatedTask;
        },
        deleteTask: async (parent, { _id }, context) => {
            const oldTask = await Task.findOneAndDelete({
                _id: _id,
            });

            await Account.updateOne(
                {
                    _id: context.user.familyId,
                },
                {
                    $pull: { masterList: _id },
                }
            );

            return oldTask;
        },
    },
};

module.exports = resolvers;
