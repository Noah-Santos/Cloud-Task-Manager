async function pushData(){
  const task = [
  {
        "name": "Essay",
        "description": "Write essay",
        "taskID": 1,
        "completed": false,
        "assigned": "unassigned"
    },
    {
        "name": "Project",
        "description": "Finish task manager project",
        "taskID": 2,
        "completed": false,
        "assigned": "unassigned"
    },
    {
        "name": "Planning",
        "description": "Plan website",
        "taskID": 3,
        "completed": false,
        "assigned": "unassigned"
    },
    {
        "name": "Caretaking",
        "description": "Care for plants",
        "taskID": 4,
        "completed": false,
        "assigned": "unassigned"
    },
    {
        "name": "Feeding",
        "description": "Feed cat",
        "taskID": 5,
        "completed": false,
        "assigned": "unassigned"
    },
    {
        "name": "Eat",
        "description": "Eat dinner",
        "taskID": 6,
        "completed": false,
        "assigned": "unassigned"
    },
    {
        "name": "Study",
        "description": "Study coding content",
        "taskID": 7,
        "completed": false,
        "assigned": "unassigned"
    },
    {
        "name": "Read",
        "description": "Read book",
        "taskID": 8,
        "completed": false,
        "assigned": "unassigned"
    },
    {
        "name": "Charging",
        "description": "Charge devices",
        "taskID": 9,
        "completed": false,
        "assigned": "unassigned"
    },
    {
        "name": "Logging",
        "description": "Log work hours",
        "taskID": 10,
        "completed": false,
        "assigned": "unassigned"
    }
  ];

  // for(let i = 0; i < task.length; i++){
  //   fetch(`/api/task/`, {
  //     method: "POST",
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify({name:task.name, description:task.description, completed:task.completed, assigned:task.assigned, taskID:task.taskID}),
        
  //   })
  // }
  const tasks = new task({})
await tasks.save()
}

pushData();