// Define UI Variables 

const taskInput = document.querySelector('#task'); //the task input text field

const form = document.querySelector('#task-form'); //The form at the top

const filter = document.querySelector('#filter'); //the task filter text field

const taskList = document.querySelector('.collection'); //The ul

const clearBtn = document.querySelector('.clear-tasks'); //the all task clear button

// form submit 
form.addEventListener('submit', addNewTask); //this are first order function

// Clear All Tasks
clearBtn.addEventListener('click', clearAllTasks);

//   Filter Task 
filter.addEventListener('keyup', filterTasks);


// event handlers

function addNewTask(e) {
    e.preventDefault();
    alert("add new task");
}

function clearAllTasks(e) {
    alert("clear all tasks");
}

function filterTasks(e){
    console.log("searching...")
}