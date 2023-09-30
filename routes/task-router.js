const express = require('express');
const router = express.Router();

// Below here is to work with the router application

let Task = require('../models/tasks');

router.get('/', async(req,res)=>{
    try {
        let task = await Task.find({});
        res.json(task);
    } catch (error) {
        console.log(error)
    }
});

router.post('/', async(req,res)=>{
    try {
        let allTask = await Task.find({});
        const {description, name, assigned} = req.body;

        let newPerson = await Task.create({name:name, description:description, assigned:assigned, taskID:allTask.length+1});
        allTask = await Task.find({});
        res.json(allTask);

    } catch (error) {
        console.log(error);
    }
});

// put request
router.put('/:taskID', async(req,res)=>{
    try {
        let {taskID} = req.params;
        let {name, description, assigned, completed} = req.body;
        let changeTask = Task.findById(taskID)

        if(!name){
            name = changeTask.name;
        }
        if(!description){
            description = changeTask.description;
        }
        if(!assigned){
            assigned = changeTask.assigned;
        }

        let task = await Task.findOneAndUpdate({taskID:taskID}, {name:name, description:description, assigned:assigned, completed:completed});
        res.json(task);
    } catch (error) {
        console.log(error);
    }
})

// delete request
router.delete('/:taskID', async(req, res)=>{
    try {
        const {taskID} = req.params;
        let task = await Task.findOneAndDelete({taskID:taskID});
        res.json(task);
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;