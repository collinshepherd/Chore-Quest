const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
    taskName: {
        type: String,
        required: true,
    },
    assignedUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    complete: {
        type: Boolean,
        default: false,
    },
});

const Task = model('Task', taskSchema);

module.exports = Task;
