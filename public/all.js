const result = document.querySelector('.list');

const fetchTask = async(value) =>{
    
    try {
        const {data} = await axios.get('/api/task');
        // going through the data array and getting the data that holds the value of data

        let task = data.map(tasks =>{
            console.log(tasks.completed);
            if(value){
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
            }else if(!value){
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
fetchTask(false);

async function checkedTask(id){
    console.log(id);
    let element = document.getElementById(`item${id}`);
    const {data} = await axios.get('/api/task');
    let name = '';
    let description = '';

    // data.map(task=>{
    //     if(task.taskID == id){
    //         name = task.name;
    //         description = task.description;
    //         assigned = task.assigned;
    //     }
    // })

    if(element.checked){
        console.log('checked')
        fetch(`/api/task/${id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({completed: true}),
        })
        element.classList.add('completed');
        fetchTask(true);
    }else if(!element.checked){
        fetch(`/api/task/${id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({completed: false}),
        })
        console.log('unchecked')
        element.classList.remove('completed')
        fetchTask(false);
    }
    
}