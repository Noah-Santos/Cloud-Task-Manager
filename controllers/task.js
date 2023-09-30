// let {task} = require('../data');
const Task = require('../models/tasks');

// get function for all task
const readTask = async(req,res)=>{
    try {
        let task = await Task.find({});
        res.json(task);
    } catch (error) {
        console.log(error)
    }
}

// post function for creating task
const createTask = async(req,res)=>{
    try {
        let allTask = await Task.find({});
        const {name, description, assigned} = req.body;

        let newPerson = await Task.create({name:name, description:description, assigned:assigned, taskID:allTask.length+1});
        allTask = await Task.find({});
        res.json(allTask);

    } catch (error) {
        console.log(error);
    }
}

// put function for update task
const updateTask = async(req,res)=>{
    try {
        let {taskID} = req.params;
        let {name, description, assigned, completed} = req.body;
        let changePerson = Task.findById(taskID)

        if(!name){
            name = changePerson.name;
        }
        if(!description){
            description = changePerson.description;
        }
        if(!assigned){
            assigned = changePerson.assigned;
        }

        let task = await Task.findOneAndUpdate({taskID:taskID}, {name:name, description:description, assigned:assigned, completed:completed});
        res.json(task);
    } catch (error) {
        console.log(error);
    }
}

// delete function for delete task
const deleteTask = async(req,res)=>{
    try {
        const {taskID} = req.params;
        let person = await Task.findOneAndDelete({taskID:taskID});
        res.json(person);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {readTask, createTask, updateTask, deleteTask};