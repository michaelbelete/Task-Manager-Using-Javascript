// Define UI Variables
const taskInput = document.querySelector("#task"); //the task input text field
const form = document.querySelector("#task-form"); //The form at the top
const filter = document.querySelector("#filter"); //the task filter text field
const taskList = document.querySelector(".collection"); //The UL
const clearBtn = document.querySelector(".clear-tasks"); //the all task clear button
const reloadIcon = document.querySelector(".fa"); //the reload button at the top navigation
const message = document.querySelector("#message");

const asc = document.querySelector('#asc')
const dsc = document.querySelector('#dsc')



let DB;

document.addEventListener('DOMContentLoaded', () => {
    let TasksDB = indexedDB.open('task-manager', 1); //create if not exist else open it

    TasksDB.onsuccess = function () {
        console.log('Database Ready')

        DB = TasksDB.result;

    }

    TasksDB.onupgradeneeded = function (e) {
        let db = e.target.result;
        let objectStore = db.createObjectStore('tasks', {
            keyPath: 'id',
            autoIncrement: true
        })

        objectStore.createIndex('taskname', 'taskname', {
            unique: false
        })
        objectStore.createIndex('date', 'date', {
            unique: false
        })

    }
    TasksDB.onerror = function (e) {
        alert("error occurred check your console")
        console.log("error occured creating the database")
        console.log("Error: " + e)
    }
});

form.addEventListener('submit', addNewTask)

function addNewTask(e) {
    e.preventDefault();
    const nowDate = new Date();
    const nowDateString = nowDate.getHours() + ":" + nowDate.getMinutes() + ":" + nowDate.getSeconds() + ":" + nowDate.getMilliseconds()

    let newTask = {
        taskname: taskInput.value,
        date: nowDateString
    }

    let transaction = DB.transaction(['tasks'], 'readwrite')
    let objectStore = transaction.objectStore('tasks')

    let request = objectStore.add(newTask)

    request.onsuccess = function () {
        createMessage("task created successfully", "green")
        form.reset()
        taskInput.value = ""
    }

    transaction.oncomplete = () => {
        console.log('New appointment added');
        displayTaskList();
    }

    transaction.onerror = function (e) {
        createMessage('error occured: ' + e, "red")
    }
}


function displayTaskList() {
    // clear the previous task list
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // create the object store
    let objectStore = DB.transaction('tasks').objectStore('tasks');

    objectStore.openCursor().onsuccess = function (e) {
        // assign the current cursor
        let cursor = e.target.result;

        if (cursor) {
            createTaskElement(cursor.value.id, cursor.value.taskname, cursor.value.date)
            cursor.continue();
        }
    }
}



function createMessage(msg, color) {
    message.innerText = msg;
    message.className = `card-panel white-text ${color}`;
    message.style.display = "block";

    const del = document.createElement("a");
    del.classList = "delete-item secondary-content";
    del.innerHTML = '<i class="fa fa-remove"></i>';

    message.appendChild(del);
}

function createTaskElement(id, task, date) {
    // Create an li element when the user adds a task
    const li = document.createElement("li");
    // Adding a class
    li.className = "collection-item";
    li.setAttribute('data-task-id', id);
    // Create text node and append it
    const p = document.createElement("span")
    p.innerHTML = task
    li.appendChild(p);
    // Create new element for the link
    const link = document.createElement("a");
    // Add class and the x marker for a
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);
    // Append to UL
    taskList.appendChild(li);
    const addDate = document.createElement("em")
    addDate.className = "align-right"
    addDate.innerHTML = date
    li.appendChild(addDate)
}