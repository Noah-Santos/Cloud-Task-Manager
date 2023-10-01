const results = document.querySelector('.results');

// loads the page with all of the different people and their info
const fetchPeople = async() =>{
    try {
        const {data} = await axios.get('/api/people');
        console.log(data);

        // going through the data array and getting the data that holds the value of data
        const people = data.map((person)=>{
            return `<option value="${person.name}">${person.name}</option>`;
        })

        results.innerHTML = people.join("");

        newName.value = '';
        newAge.value = '';
        newAssign.value = '';
        change();
    }catch(e){
        // formAlert.textContent = e.response.data.msg;
    }
}
fetchPeople();

// gets the info for a new user
const btn = document.querySelector('.submit-btn');
const input = document.querySelector('.form-input');
const input2 = document.querySelector('#age');

// get the info to change user info
const newName = document.querySelector('#newName');
const newAge = document.querySelector('#newAge');
const newAssign = document.querySelector('#newAssign');

const formAlert = document.querySelector('.form-alert');

// gets the sections of the html page to display user info
const names = document.querySelector('.name');
const age = document.querySelector('.age');
const assignment = document.querySelector('.task');

let chosenName = ''; 
let chosenAge = '';
let chosenID;
let newTask = '';


// changes the content of the page when a new person is selected from the dropdown
// also pushes data into session storage, so when user edits the person, it knows what info to autofill in the input sections
async function change(){
    let {data} = await axios.get('/api/people');
    names.innerHTML = results.value;
    data.find(person =>{
        if(person.name == results.value){
            age.innerHTML = `Age: ${person.age}`;
            assignment.innerHTML = `Task: ${person.task}`;
            sessionStorage.setItem('chosenName', results.value);
            sessionStorage.setItem('chosenAge', person.age);
            sessionStorage.setItem('chosenID', person.userID);
            sessionStorage.setItem('task', person.task);
            chosenID = person.userID;
        }
    })
}

// gets the data from the previously selected person in order to autofill the input sections on the edit page
function inputs(){
    newName.value = sessionStorage.getItem('chosenName');
    newAge.value = sessionStorage.getItem('chosenAge');
    newAssign.value = sessionStorage.getItem('task');
    chosenID = sessionStorage.getItem('chosenID');
    editMode = true;
}

btn.addEventListener('click', async(event)=>{
    // prevents page from reloading on submit because we are doing something with the data
    event.preventDefault();
    try{
        // gets the information to create a new person
        if(!editMode){
            let nameValue = input.value;
            let ageValue = input2.value;
            const {data} = await axios.post('/api/people', {name: nameValue, age:ageValue});
            const h5 = document.createElement('h5');
            h5.textContent = data.person;
            results.appendChild(h5);
            fetchPeople();
            input.value='';
            input2.value='';
        // gets the info to edit a person
        }else{
            let nameChange = newName.value;
            let ageChange = newAge.value;

            let personTask = '';

            // gets the persons task
            if(true){
                const {data} = await axios.get('/api/people');
                data.map(person=>{
                    if(person.name == nameChange){
                        personTask += person.task;
                    }
                })
            }

            // filters through the task objcts
            const {data} = await axios.get('/api/task');
            console.log(data);
            // determines if the task has a person assigned to it
            // if it doesn't, then it assigns the person to the task
            data.map(task=>{
                console.log(task)
                if(task.name == newAssign.value){
                    if(task.assigned == 'unassigned' && personTask == 'none'){
                        newTask = task.name;
                        // updates the task
                        fetch(`/api/task/${task.taskID}`, {
                            method: "PUT",
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({assigned: nameChange}), 
                        })
                    }else if(personTask != 'unassigned'){
                        newPerson = personTask;
                    }
                }
            })
            // if the input is empty, default value to none
            if(newAssign.value == ''){
                newTask = 'none';
            }

            // updates the person
            fetch(`/api/people/${chosenID}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name: nameChange, age: ageChange, task:newTask}),
                
            })

            window.location.href = "./people.html";
            fetchPeople();
            editMode = false;
        }
    }catch(e){
        console.log(e);
        // formAlert.textContent = e.response.data.msg;
    }
});

var editMode = false;
var currentId = '';

// gets info for editing the person
function nameAlter(){
    editMode = true;
    newName.value = chosenName;
    newAge.value = chosenAge;
}

// deletes the person
let deleteThis = async(event)=>{
    fetch(`/api/people/${chosenID}`, {
        // makes sure that the put function is the one that is grabbed
        method: "DELETE",
        // determines what data to send
        headers: {'Content-Type': 'application/json'},
    })
    fetchPeople();
}

// when the page loads, it will fill the information of the first person onto the little section at the bottom
async function infoPerson(){
    let {data} = await axios.get('/api/people');
    names.innerHTML = data[0].name;
    age.innerHTML = data[0].age;
    assignment.innerHTML = `Task: ${data[0].task}`;
}

// if the task is unassigned from a person, it will unassign the person from the task once this person page loads
async function checkInfo(){
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