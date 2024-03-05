const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./User');
// const Task = require('./Task');

const accountSchema = new Schema({
    familyName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
        type: String,
        required: true,
    },
    users: [User.schema],
    tasks: [Task.schema],
})

// hash user password
accountSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10
        this.password = await bcrypt.hash(this.password, saltRounds)
    }

    next()
})

// custom method to compare and validate password for logging in
accountSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

const Account = model('Account', accountSchema)

module.exports = Account;
