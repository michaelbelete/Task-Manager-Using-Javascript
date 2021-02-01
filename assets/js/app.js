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

    let newTask = { taskname: taskInput.value, date: nowDateString }

    let transaction = DB.transaction(['tasks'], 'readwrite')
    let objectStore = transaction.objectStore('tasks')

    let request = objectStore.add(newTask)

    request.onsuccess = function() {
        createMessage("task created successfully", "green")
        taskInput.value = ""
    }

    request.onerror = function(e) {
        createMessage('error occured: ' + e, "red")
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