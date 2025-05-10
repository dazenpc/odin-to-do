import { projectPersistHelper, persistHelper } from "./persistence";
import { Todo } from "./todo_module";
import { display } from "./reload";

let projectAdder = document.querySelector(".project-links button");
let projectAdderDialog = document.querySelector(".project-links dialog");
let projectAdderForm = document.querySelector(".project-links dialog form")
let userAddedProjectList = document.querySelector("ul.user-added-projects");
export let titleCard = document.querySelector(".main .hero p.title");

export const inProject = {name: "Uncategorized"};



export function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1).toLowerCase();
}

projectAdder.addEventListener("click", ()=>{
    projectAdderDialog.showModal();

    projectAdderDialog.addEventListener('click', (e) => {
        const rect = projectAdderDialog.getBoundingClientRect();
        const isInDialog =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
      
        if (!isInDialog) {
          projectAdderDialog.close();
        }
    })
    });

projectAdderForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(!projectAdderForm.checkValidity()) return;

    let projectName;
    let userCreatedProject = document.createElement("li");
    let deleteProject = document.createElement("button");
    deleteProject.textContent = "D"
    
    projectName = capitalizeFirstLetter(projectAdderForm.elements[0].value);
    userCreatedProject.innerText = projectName;
    projectPersistHelper.save(projectName);
    
    userCreatedProject.addEventListener("click", ()=>{
        titleCard.innerText = projectName;
        inProject.name = projectName;
        loadProjectTasks(projectName);
        console.log(inProject);
    })
    
    deleteProject.addEventListener("click", (e)=>{
        e.stopPropagation();
        deleteProjectAndTask(projectName);
    });
    
    userCreatedProject.setAttribute("style", "cursor: pointer; display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;");
    userCreatedProject.classList.add("user-created-item");
    
    userCreatedProject.appendChild(deleteProject);
    userAddedProjectList.appendChild(userCreatedProject);
    projectAdderForm.reset();
    projectAdderDialog.close();
})


export function deleteProjectAndTask(project) {
    // remove project from localstorage
    projectPersistHelper.delete(project);
    // set inProject.name to null
    inProject.name = null;
    // remove all the tasks from the local storage which has the given project name
    let indexAvailable = localStorage.getItem("index")? true : false;
    if(indexAvailable){
            let index = parseInt(localStorage.getItem("index")) - 1;
            let mainIndex = index;
            while(localStorage.getItem(index.toString())){
                let todoTask = Todo.reviewTodo(JSON.parse(localStorage.getItem(index.toString())));
                if(todoTask.project == project){
                    persistHelper.delete(index);
                    let updated = mainIndex -1;
                    localStorage.setItem("index", updated.toString());
                }
                index--;
            }
        }
        else{
            console.log(`No tasks with the name: ${project}`);
        }
    // reload to all tasks
    location.reload();
}

export function loadProjectTasks(projectName) {
    console.log("pressed");
    const mainArea = document.querySelector(".content");
    mainArea.setAttribute("style", "padding: 1rem");

    mainArea.replaceChildren();

    let indexAvailable = localStorage.getItem("index")? true : false;

    if(indexAvailable){
            let index = parseInt(localStorage.getItem("index")) - 1;
            while(localStorage.getItem(index.toString())){
                let todoTask = Todo.reviewTodo(JSON.parse(localStorage.getItem(index.toString())));
                index--;
                if(todoTask.project == projectName) display(todoTask);
            }
        }
}


