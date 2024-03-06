const { Schema, model } = require('mongoose')

const taskSchema = new Schema({
    listName: {
        type: String,
        required: true,
    },
    tasks: {
        type: Array,
        required: true,
    },
    value: {
        type: Number,
        set: (num) => num * 100,
        get: (num) => num / 100,
    },
    description: {
        type: String,
    },
    ageRange: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
})

const Task = model('Task', taskSchema)

module.exports = Task
