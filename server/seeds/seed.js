const db = require('../config/connection')
const { User } = require('../models')
const cleanDB = require('./cleanDB')

const userData = require('./userData.json')

db.once('open', async () => {
    await cleanDB('User', 'users')

    // bulk create each model
    try {
        await User.insertMany(userData)
    } catch (err) {
        console.log(err)
    }

    console.log('all done!')
    process.exit(0)
})
