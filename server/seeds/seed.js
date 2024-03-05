const db = require('../config/connection')
const { User, Account } = require('../models')

// Requiring data from json files
const userData = require('./userData.json')
const accountData = require('./accountData.json')

db.once('open', async () => {
    User.collection.drop()
    Account.collection.drop()

    // bulk creating data
    try {
        // Creating the new account
        const newAccount = await Account.insertMany(accountData)

        // Adding accountID to the users before they are created
        const updatedUsers = userData.map((user) => ({
            ...user,
            accountId: newAccount[0]._id,
        }))

        // Creating Users with the new accountID
        const users = await User.insertMany(updatedUsers)

        // Taking their ids to add to the account plan
        const userIds = users.map((user) => user._id)

        // Adding the new users to the account
        await Account.findOneAndUpdate(
            {
                _id: newAccount[0]._id,
            },
            {
                $push: { users: userIds },
            }
        )
    } catch (err) {
        console.log(err)
    }

    console.log('all done!')
    process.exit(0)
})
