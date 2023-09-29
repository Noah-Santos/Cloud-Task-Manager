const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Must provide a name'],
        trim: true,
        maxLength: [20, "The name can't exceed 20 chracters"]
    },
    description:{
        type: String,
        required: [true, 'Must provide a description'],
        trim: true,
    },
    taskID:{
        type: Number,
        default: 0
    },
    assigned:{
        type: String,
        default: 'unassigned'
    },
    completed:{
        type: Boolean,
        default: false
    }
},{collection: 'Tasks'})

module.exports = mongoose.model('Task', TaskSchema);