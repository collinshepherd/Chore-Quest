const { Schema, model, Decimal128 } = require('mongoose');
const bcrypt = require('bcrypt');

// getter for the balance property that allows us to keep the decimals for the currency correctly.
function getPrice(balance) {
    return (balance / 100).toFixed(2);
}

// setter that will set the balance to cents instead of dollars and cents
function setPrice(balance) {
    return balance * 100;
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        minLength: 4,
        maxLength: 30,
    },
    age: {
        type: Number,
    },
    balance: {
        type: Number,
        set: setPrice,
        get: getPrice,
    },
    roles: {
        type: Array,
    },
    accountId: {
        type: Schema.Types.ObjectId,
    },
});

// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
