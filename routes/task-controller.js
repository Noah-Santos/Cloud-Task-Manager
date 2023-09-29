const express = require('express');
const router = express.Router();

const{createTask, readTask, updateTask, deleteTask} = require("../controllers/task");

router.get('/', readTask);
router.post('/', createTask);
router.put('/:taskID', updateTask);
router.delete('/:taskID', deleteTask);

module.exports = router;