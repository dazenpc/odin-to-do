import { Todo } from "./todo_module";
import { display } from "./reload";

let allTasks = document.querySelector(".quick-links li:first-child");
let todayTasks = document.querySelector(".quick-links li:nth-child(2)");
let upcomingTasks = document.querySelector(".quick-links li:nth-child(3)");
let completedTasks = document.querySelector(".quick-links li:nth-child(4)");

let mainDisplay = document.querySelector(".content");
let headingName = document.querySelector(".hero p.title");


allTasks.addEventListener("click", ()=>{location.reload()});


todayTasks.addEventListener("click", ()=>{
    headingName.textContent = "Tasks of today";
    mainDisplay.replaceChildren();
    let indexAvailable = localStorage.getItem("index");
    if(indexAvailable){
            let index = parseInt(localStorage.getItem("index"));
            while(index != -1){
              if(localStorage.getItem(index.toString())){
                let todoTask = Todo.reviewTodo(JSON.parse(localStorage.getItem(index.toString())));
                let date = todoTask.dueDate;
                let compareDate = new Date();
                let matching = (compareDate.getFullYear() == date.getFullYear()) && 
                ((compareDate.getDate()+1) == date.getDate()) && 
                (compareDate.getMonth() == date.getMonth());
                if(matching && !todoTask.isCompleted) display(todoTask);
              }
              index--;
            }
        }
});

upcomingTasks.addEventListener("click", ()=>{
    headingName.textContent = "Upcoming tasks";
    mainDisplay.replaceChildren();
    let indexAvailable = localStorage.getItem("index");
    if(indexAvailable){
            let index = parseInt(localStorage.getItem("index"));
            while(index != -1){
              if(localStorage.getItem(index.toString())){
                let todoTask = Todo.reviewTodo(JSON.parse(localStorage.getItem(index.toString())));
                let date = todoTask.dueDate;
                let compareDate = new Date();
                let matching = (compareDate.getDate()+1) != date.getDate();
                if(matching && !todoTask.isCompleted) display(todoTask);
              }
              index--;
            }
        }
});


completedTasks.addEventListener("click", ()=>{
    headingName.textContent = "Completed tasks";
    mainDisplay.replaceChildren();
    let indexAvailable = localStorage.getItem("index");
    if(indexAvailable){
            let index = parseInt(localStorage.getItem("index"));
            while(index != -1){
              if(localStorage.getItem(index.toString())){
                let todoTask = Todo.reviewTodo(JSON.parse(localStorage.getItem(index.toString())));
                if(todoTask.isCompleted) display(todoTask);
              }
              index--;
            }
        }
});