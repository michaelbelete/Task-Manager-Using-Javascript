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

    TasksDB.onsuccess = function() {
        console.log('Database Ready')

        const DB = TasksDB.result;

        console.log(DB)
    }

    
    TasksDB.onerror = function(e) {
        alert("error occured check your console")
        console.log("error occured creating the database")
        console.log("Error: " + e)
    }
});