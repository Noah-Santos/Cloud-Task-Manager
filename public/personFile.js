const results = document.querySelector('.results');

const fetchPeople = async() =>{
    try {
        const {data} = await axios.get('/api/people');
        console.log(data);

        // going through the data array and getting the data that holds the value of data
        const people = data.map((person)=>{
            return `<option value="${person.name}">${person.name}</option>`;
        })

        results.innerHTML = people.join("");

        change();
    }catch(e){
        // formAlert.textContent = e.response.data.msg;
    }
}
fetchPeople();

// HTML Submit Form
const btn = document.querySelector('.submit-btn');
const input = document.querySelector('.form-input');
const input2 = document.querySelector('#age');
const input3 = document.querySelector('#task');

const newName = document.querySelector('#newName');
const newAge = document.querySelector('#newAge');
const newAssign = document.querySelector('#newAssign');

const formAlert = document.querySelector('.form-alert');

const names = document.querySelector('.name');
const age = document.querySelector('.age');
const assignment = document.querySelector('.task');
let chosenName = ''; 
let chosenAge = '';
let chosenID;

async function change(){
    let {data} = await axios.get('/api/people');
    names.innerHTML = results.value;
    data.find(person =>{
        if(person.name == results.value){
            age.innerHTML = person.age;
            assignment.innerHTML = `Task: ${person.task}`;
            sessionStorage.setItem('chosenName', results.value);
            sessionStorage.setItem('chosenAge', person.age);
            sessionStorage.setItem('chosenID', person.userID);
            sessionStorage.setItem('task', person.task);
            chosenID = person.userID;
            // console.log(chosenID)
        }
    })
}

function inputs(){
    // console.log('yes')
    newName.value = sessionStorage.getItem('chosenName');
    newAge.value = sessionStorage.getItem('chosenAge');
    newAssign.value = sessionStorage.getItem('task');
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
            let ageValue = input2.value;
            let taskValue = input3.value;
            const {data} = await axios.post('/api/people', {name: nameValue, age:ageValue, task:taskValue});
            const h5 = document.createElement('h5');
            h5.textContent = data.person;
            results.appendChild(h5);
            fetchPeople();
            input.value='';
            input2.value='';
            input3.value='';
        }else{
            let nameChange = newName.value;
            let ageChange = newAge.value;
            if(newAssign.value == ''){
                assigned = 'unassigned';
            }else{
                assigned = newAssign.value;
            }
            // console.log(taskChange)
            fetch(`/api/people/${chosenID}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name: nameChange, age: ageChange, task:assigned}),
                
            })
            newName.value = '';
            newAge.value = '';
            newAssign.value = '';
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

function nameAlter(){
    editMode = true;
    newName.value = chosenName;
    newage.value = chosenAge;
}


function deleteThis(){
    fetch(`/api/people/${chosenID}`, {
        // makes sure that the put function is the one that is grabbed
        method: "DELETE",
        // determines what data to send
        headers: {'Content-Type': 'application/json'},
    })
    fetchPeople();
}