import { projectPersistHelper } from "./persistence";

let projectAdder = document.querySelector(".project-links button");
let projectAdderDialog = document.querySelector(".project-links dialog");
let projectAdderForm = document.querySelector(".project-links dialog form")
let userAddedProjectList = document.querySelector("ul.user-added-projects");

export const inProject = {name: "Uncategorized"};



export function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1).toLowerCase();
}

projectAdder.addEventListener("click", ()=>{
    projectAdderDialog.showModal();
});

projectAdderForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    
    let projectName;
    let userCreatedProject = document.createElement("li");

    projectName = capitalizeFirstLetter(projectAdderForm.elements[0].value);
    userCreatedProject.innerText = projectName;
    projectPersistHelper.save(projectName);

    userCreatedProject.addEventListener("click", ()=>{
        inProject.name = projectName;
        console.log(inProject);
    })

    userCreatedProject.setAttribute("style", "cursor: pointer;");
    userCreatedProject.classList.add("user-created-item");

    userAddedProjectList.appendChild(userCreatedProject);
    projectAdderForm.reset();
    projectAdderDialog.close();
})


