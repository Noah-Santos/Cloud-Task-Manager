let result = document.querySelector('.results');

// determines which format the task should be loaded in
const fetchTask = async() =>{
    
    try {
        const {data} = await axios.get('/api/task');
        // going through the data array and getting the data that holds the value of data
        result.innerHTML = '';
        let task = data.map(tasks =>{
            console.log(tasks.completed);
            if(tasks.completed){
                return `
                <form class="allRow completedForm">
                    <div class="taskAll">
                        <label for="${tasks.taskID}" class="info completed">
                            <h2>${tasks.name}</h2>
                            <h3>${tasks.description}</h3>
                            <h4>Assigned: ${tasks.assigned}</h4>
                        </label>
                    </div>
                    <div class="finish">
                        <h4 class="marginGone">Completed:</h4>
                        <input type="checkbox" id="item${tasks.taskID}" name="${tasks.taskID}" value="${tasks.name}" onclick="checkedTask(${tasks.taskID})" checked>
                    </div>
                </form>`;
            }else if(!tasks.completed){
                return `
                <form class="allRow">
                    <div class="taskAll">
                        <label for="${tasks.taskID}" class="info">
                            <h2>${tasks.name}</h2>
                            <h3>${tasks.description}</h3>
                            <h4>Assigned: ${tasks.assigned}</h4>
                        </label>
                    </div>
                    <div class="finish">
                        <h4 class="marginGone">Completed:</h4>
                        <input type="checkbox" id="item${tasks.taskID}" name="${tasks.taskID}" value="${tasks.name}" onclick="checkedTask(${tasks.taskID})">
                    </div>
                </form>`;
            }
        })
        result.innerHTML = task.join("");
    }catch(e){
        // formAlert.textContent = e.response.data.msg;
    }
}
fetchTask();

// loads all the people
const fetchPeople = async() =>{
    
    try {
        result.innerHTML = '';
        const {data} = await axios.get('/api/people');
        // going through the data array and getting the data that holds the value of data

        let people = data.map(person =>{
            return `
                <form class="allRow">
                    <div class="taskAll">
                        <label for="${person.userID}" class="info">
                            <h2>${person.name}</h2>
                            <h3>Age: ${person.age}</h3>
                            <h4>Task: ${person.task}</h4>
                        </label>
                    </div>
                </form>`;
        })
        result.innerHTML = people.join("");
    }catch(e){
        // formAlert.textContent = e.response.data.msg;
    }
}

// determines whether the task is completed or uncompleted when it is clicked
async function checkedTask(id){
    console.log(id);
    let element = document.getElementById(`item${id}`);

    if(element.checked){
        console.log('checked')
        fetch(`/api/task/${id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({completed: true}),
        })
        element.classList.add('completed');
    }else if(!element.checked){
        fetch(`/api/task/${id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({completed: false}),
        })
        console.log('unchecked')
        element.classList.remove('completed')
    }
    fetchTask();
}

// determines which set of data to display
let dropdown = document.querySelector(".dropdown");

function change(){
    console.log('changed')
    let choice = dropdown.value;
    if(choice == 'task'){
        fetchTask();
    }else if(choice == 'people'){
        fetchPeople();
    }
}

// updates the info
async function checkInfo(){
    let task;
    let allTask;

    if(true){
        const {data} = await axios.get('/api/task');

        // gets all of the task names that have no person assigned to them
        task = data.map(task=>{
            if(task.assigned == 'unassigned'){
                return task.name;
            }
        })

        // gets all of the task names
        allTask = data.map(task=>{
            return task.name;
        })
    }
    
    if(true){
        let {data} = await axios.get('/api/people');
        data.map(person=>{

            // if the person has a task that was changed to unassigned, the task is removed from the person
            for(let i = 0; i < task.length; i++){
                if(person.task == task[i]){
                    fetch(`/api/people/${person.userID}`, {
                        method: "PUT",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({task:'none'}),
                        
                    })
                }
            }

            // if the task is not found, remove the task from the person
            let find = false;
            for(let i = 0; i < allTask.length; i++){
                if(allTask[i] == person.task){
                    find = true;
                }
            }
            if(find == false){
                fetch(`/api/people/${person.userID}`, {
                    method: "PUT",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({task:'none'}),
                    
                })
            }
        })
    }

    let person;
    let allPeople;

    if(true){
        const {data} = await axios.get('/api/people');

        // gets all the people with no tasks
        person = data.map(person=>{
            if(person.task == 'none'){
                return person.name;
            }
        })

        // gets all of the people
        allPeople = data.map(person=>{
            return person.name;
        })
    }

    if(true){
        let {data} = await axios.get('/api/task');
        data.map(task=>{

            // if the task has a person with no task, the person is removed from the task
            for(let i = 0; i < person.length; i++){
                if(task.assigned == person[i]){
                    fetch(`/api/task/${task.taskID}`, {
                        method: "PUT",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({assigned:'unassigned'}),
                        
                    })
                }
            }

            // if the task has a person that does not exist, remove the person from the task
            let find = false;
            for(let i = 0; i < allPeople.length; i++){
                if(allPeople[i] == task.assigned){
                    find = true;
                }
            }
            if(find == false){
                fetch(`/api/task/${task.taskID}`, {
                    method: "PUT",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({assigned:'unassigned'}),
                    
                })
            }
        })
    }
}