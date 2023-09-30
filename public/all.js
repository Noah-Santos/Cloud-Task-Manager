let result = document.querySelector('.results');
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
                            <h3>${person.age}</h3>
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

async function checkInfo(){
    let task;
    if(true){
        const {data} = await axios.get('/api/task');
        task = data.map(task=>{
            if(task.assigned == 'unassigned'){
                return task.name;
            }
        })
    }
    if(true){
        let {data} = await axios.get('/api/people');
        data.map(person=>{
            for(let i = 0; i < task.length; i++){
                if(person.task == task[i]){
                    fetch(`/api/people/${person.userID}`, {
                        method: "PUT",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({task:'none'}),
                        
                    })
                }
            }
        })
    }

    let person;
    if(true){
        const {data} = await axios.get('/api/people');
        person = data.map(person=>{
            if(person.task == 'none'){
                return person.name;
            }
        })
    }
    if(true){
        let {data} = await axios.get('/api/task');
        data.map(task=>{
            for(let i = 0; i < person.length; i++){
                if(task.assigned == person[i]){
                    fetch(`/api/task/${task.taskID}`, {
                        method: "PUT",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({assigned:'unassigned'}),
                        
                    })
                }
            }
        })
    }
}