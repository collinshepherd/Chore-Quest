const { Schema, model } = require('mongoose');
const { getPrice, setPrice } = require('./User');

const taskSchema = new Schema({
    listName: {
        type: String,
        required: true,
    },
    taskName: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        set: setPrice,
        get: getPrice,
    },
    description: {
        type: String,
    },
    ageRange: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
});

const Task = model('Task', taskSchema);

module.exports = Task;