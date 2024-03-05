const db = require('../config/connection')
const { User, Account } = require('../models')
const cleanDB = require('./cleanDB')

// Requiring data from json files
const userData = require('./userData.json')
const accountData = require('./accountData.json')

db.once('open', async () => {
    await cleanDB('User', 'users')

    // bulk creating data
    try {
        // Creating Users
        const users = await User.insertMany(userData)

        // Taking their ids to add to the account plan
        const userIds = users.map((user) => user._id)

        // Creating a new object with the user ids inside
        const newAccount = {
            ...accountData,
            users: userIds,
        }

        // Creating the new account
        await Account.insertMany(newAccount)
    } catch (err) {
        console.log(err)
    }

    console.log('all done!')
    process.exit(0)
})
