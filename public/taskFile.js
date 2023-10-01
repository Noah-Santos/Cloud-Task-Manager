const results = document.querySelector('.results');

// displays all of the tasks and their info
const fetchTask = async() =>{
    try {
        const {data} = await axios.get('/api/task');
        console.log(data);

        // going through the data array and getting the data that holds the value of data
        const task = data.map((tasks)=>{
            return `<option value="${tasks.name}">${tasks.name}</option>`;
        })

        results.innerHTML = task.join("");

        change();
        newTask.value = '';
        newDesc.value = '';
        newAssign.value = '';
    }catch(e){
        // formAlert.textContent = e.response.data.msg;
    }
}
fetchTask();

// gets the info for a new task
const btn = document.querySelector('.submit-btn');
const input = document.querySelector('.form-input');
const input2 = document.querySelector('#description');

// gets the info to change a current task
const newTask = document.querySelector('#newName');
const newDesc = document.querySelector('#newDescription');
let newAssign = document.querySelector('#newAssign');

const formAlert = document.querySelector('.form-alert');

// gets the sections to display task info
const task = document.querySelector('.task');
const description = document.querySelector('.description');
const assignment = document.querySelector('.assignment');
let chosenTask = ''; 
let chosenDescription = '';
let chosenID;
let newPerson = '';

// changes the content of the page when a new task is selected from the dropdown
// also pushes data into session storage, so when user edits the task, it knows what info to autofill in the input sections
async function change(){
    let {data} = await axios.get('/api/task');
    task.innerHTML = results.value;
    data.find(task =>{
        if(task.name == results.value){
            description.innerHTML = task.description;
            assignment.innerHTML = `Assigned: ${task.assigned}`;
            sessionStorage.setItem('chosenTask', results.value);
            sessionStorage.setItem('chosenDescription', task.description);
            sessionStorage.setItem('chosenID', task.taskID);
            sessionStorage.setItem('assigned', task.assigned);
            chosenID = task.taskID;
        }
    })
}

// gets the data from the previously selected task in order to autofill the input sections on the edit page
function inputs(){
    newTask.value = sessionStorage.getItem('chosenTask');
    newDesc.value = sessionStorage.getItem('chosenDescription');
    newAssign.value = sessionStorage.getItem('assigned');
    chosenID = sessionStorage.getItem('chosenID');
    editMode = true;
}

btn.addEventListener('click', async(event)=>{
    // prevents page from reloading on submit because we are doing something with the data
    event.preventDefault();
    try{
        // gets the info to create a new task
        if(!editMode){
            let nameValue = input.value;
            let descValue = input2.value;
            const {data} = await axios.post('/api/task', {name: nameValue,description:descValue});
            const h5 = document.createElement('h5');
            h5.textContent = data.tasks;
            results.appendChild(h5);
            fetchTask();
            input.value='';
            input2.value='';
        // gets the info to update a task
        }else{
            let taskChange = newTask.value;
            let descriptionChange = newDesc.value;
            let taskAssign = '';

            if(true){
                const {data} = await axios.get('/api/task');
                data.map(task=>{
                    if(task.name == taskChange){
                        taskAssign += task.assigned;
                    }
                })
            }


            // filters through the people objects
            const {data} = await axios.get('/api/people');
            console.log(data);
            // determines if the person has no task
            // if it doesn't, it assigns that person to the task
            data.map(person=>{
                if(person.name == newAssign.value){
                    if(person.task == 'none' && taskAssign == 'unassigned'){
                        newPerson = person.name;
                        // updates the person
                        fetch(`/api/people/${person.userID}`, {
                            method: "PUT",
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({task:taskChange}),
                            
                        })
                    }else if(taskAssign != 'unassigned'){
                        newPerson = taskAssign;
                    }
                }
            })
            // if the input is empty, default value to unassigned
            if(newAssign.value == ''){
                newPerson = 'unassigned';
            }

            // updates the task
            fetch(`/api/task/${chosenID}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name: taskChange, description: descriptionChange, assigned:newPerson}),
                
            })

            fetchTask();
            editMode = false;
            window.location.href = "./javascript.html";
        }
    }catch(e){
        console.log(e);
        // formAlert.textContent = e.response.data.msg;
    }
});

var editMode = false;
var currentId = '';

// gets the info for when the task is edited
function nameAlter(){
    editMode = true;
    newTask.value = chosenTask;
    newDesc.value = chosenDescription;
}

// deleted the task
function deleteThis(){
    fetch(`/api/task/${chosenID}`, {
        // makes sure that the put function is the one that is grabbed
        method: "DELETE",
        // determines what data to send
        headers: {'Content-Type': 'application/json'},
    })
    fetchTask();
}

// updates information on page load
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
}