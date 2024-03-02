const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn')
const taskList = document.getElementById('taskList');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const maxTasks = 5;

const addTask = () => {

    const taskText = taskInput.value.trim();
    if ( taskText === "" ) return;

    const task = { text: taskText };
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskInput.value = "";

    if (taskList.children.length >= maxTasks) {
        alert(`Максимальное количество задач (5) достигнуто!`);
        addBtn.disabled = true
        
    }

    displayTasks();

}

const deleteTask = (index) => {

    tasks.splice(index, 1);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    if (taskList.children.length <= maxTasks) {
        addBtn.disabled = false
    }

    displayTasks();

}

const editTask = (index) => {

    const newTaskText = prompt("Edit the Task: ", tasks[index].text);

    if ( newTaskText !== null ) {

        tasks[index].text = newTaskText;

        localStorage.setItem('tasks', JSON.stringify(tasks));

        displayTasks();

    }

}

const displayTasks = () => {

    taskList.innerHTML = "";

    tasks.forEach(( task, index ) => {

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <hr>
            <div class="button-container">  
                <button class="edit-button" onclick="editTask(${index})">Edit</button>
                <button class="delete-button" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        taskList.appendChild(li)

    });

}

displayTasks()