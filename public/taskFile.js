const results = document.querySelector('.results');

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
    }catch(e){
        // formAlert.textContent = e.response.data.msg;
    }
}
fetchTask();

// HTML Submit Form
const btn = document.querySelector('.submit-btn');
const input = document.querySelector('.form-input');
const input2 = document.querySelector('#description');
const newTask = document.querySelector('#newName');
const newDesc = document.querySelector('#newDescription');
const newAssign = document.querySelector('#newAssign');
const formAlert = document.querySelector('.form-alert');
const task = document.querySelector('.task');
const description = document.querySelector('.description');
const assignment = document.querySelector('.assignment');
let chosenTask = ''; 
let chosenDescription = '';
let chosenID;

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
            chosenID = task.taskID;
            console.log(chosenID)
        }
    })
}

function inputs(){
    // console.log('yes')
    newTask.value = sessionStorage.getItem('chosenTask');
    newDesc.value = sessionStorage.getItem('chosenDescription');
    chosenID = sessionStorage.getItem('chosenID');
    // console.log(chosenID);
    // console.log(sessionStorage.getItem('chosenID'));
    editMode = true;
}

btn.addEventListener('click', async(event)=>{
    // prevents page from reloading on submit because we are doing something with the data
    event.preventDefault();
    try{
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
        }else{
            let taskChange = newTask.value;
            let descriptionChange = newDesc.value;
            if(newAssign.value == ''){
                assigned = 'unassigned';
            }else{
                assigned = newAssign.value;
            }
            // console.log(taskChange)
            fetch(`/api/task/${chosenID}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name: taskChange, description: descriptionChange, assigned:assigned}),
                
            })
            newTask.value = '';
            newDesc.value = '';
            newAssign.value = '';
            fetchTask();
            editMode = false;
        }
    }catch(e){
        console.log(e);
        // formAlert.textContent = e.response.data.msg;
    }
});

var editMode = false;
var currentId = '';

function nameAlter(){
    editMode = true;
    newTask.value = chosenTask;
    newDesc.value = chosenDescription;
}


function deleteThis(){
    fetch(`/api/task/${chosenID}`, {
        // makes sure that the put function is the one that is grabbed
        method: "DELETE",
        // determines what data to send
        headers: {'Content-Type': 'application/json'},
    })
    fetchTask();
}