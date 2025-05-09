import { Todo } from "./todo_module";
import { format, formatDistance } from "date-fns";
import { persistHelper } from "./persistence";
import { taskcompete } from "./reload";

export const editingState = {
  currentEditingTodoDiv: null,
  currentEditingTodoInstance: null,
  currentEditingTodoKey: null,
};


const taskAdderButton = document.querySelector("#addTaskButton");

function dialogOpen(){
    const taskAdderDialog = document.querySelector(".taskAdder");
    taskAdderDialog.showModal();

    taskAdderDialog.addEventListener('click', (e) => {
        const rect = taskAdderDialog.getBoundingClientRect();
        const isInDialog =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
      
        if (!isInDialog) {
          taskAdderDialog.close();
        }
      });

}


taskAdderButton.addEventListener("click", dialogOpen);

const taskAdderForm = document.querySelector(".taskAdderForm");

taskAdderForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let inputVals = taskAdderForm.elements;

    if (editingState.currentEditingTodoDiv) {
      // Update existing task UI
      editingState.currentEditingTodoDiv.querySelector("p.taskName").innerText = inputVals[0].value;
      editingState.currentEditingTodoInstance.title = inputVals[0].value;

      editingState.currentEditingTodoInstance.description = inputVals[1].value;
    
      const dueText = `Due in ${formatDistance(inputVals[2].valueAsDate, new Date())}`;
      editingState.currentEditingTodoDiv.querySelector("p.dueIn").innerText = dueText;
      editingState.currentEditingTodoInstance.dueDate = inputVals[2].valueAsDate;
    
      let newPriority;
      for (let i = 4; i < 7; i++) {
        if (inputVals[i].checked) newPriority = inputVals[i].value;
      }
      editingState.currentEditingTodoInstance.priority = newPriority;

      editingState.currentEditingTodoInstance.project = inputVals[3].value || null;
    
      let borderColor = newPriority == "high" ? "red" : newPriority == "medium" ? "yellow" : "lightgreen";
      editingState.currentEditingTodoDiv.style.borderLeft = `10px solid ${borderColor}`;

      persistHelper.update(editingState.currentEditingTodoKey.toString(), JSON.stringify(editingState.currentEditingTodoInstance));
    
      editingState.currentEditingTodoDiv = null; // Reset edit state
      editingState.currentEditingTodoInstance = null;
      editingState.currentEditingTodoKey = null;
    } else {
      displayTodo(inputVals); // Create new
    }

    taskAdderForm.reset();
    const taskAdderDialog = document.querySelector(".taskAdder");
    taskAdderDialog.close();
})

function displayTodo(inputs){
  let title = inputs[0].value;
  let desc = inputs[1].value;
  let dueDate = inputs[2].valueAsDate;
  dueDate.setHours(dueDate.getHours() + 18);
  dueDate.setMinutes(dueDate.getMinutes() + 30);
  let project = (inputs[3].value == "")? null: inputs[3].value;

  let priority;

  for(let i = 4; i < 7; i++){
    if(inputs[i].checked == true) priority = inputs[i].value;
  }

  let todoTaskKey = persistHelper.getIndex()
  const todoTask = new Todo(title,desc,priority,dueDate,todoTaskKey, project);
  persistHelper.save(JSON.stringify(todoTask));
  console.log(todoTask);
  
  // creating the block
  const todoDiv = document.createElement("div");
  const taskName = document.createElement("p");
  taskName.className = "taskName"
  taskName.innerText = title;
  taskName.setAttribute("style", "margin: 0")

  todoDiv.appendChild(taskName);
  

  const innerDiv = document.createElement("div")
  const dueIn = document.createElement("p");
  dueIn.className = "dueIn";
  dueIn.innerText = `Due in ${formatDistance(dueDate, new Date())}`;
  dueIn.setAttribute("style", "margin: 0")

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "del"
  deleteButton.setAttribute("style", "margin: 0 3rem; margin-right: 1rem; border-radius: 10px; align-self: center; font-size: medium");
  const completeTaskButton = document.createElement("input");
  completeTaskButton.setAttribute("style", "width: 30px;");
  completeTaskButton.type = "checkbox";

  innerDiv.appendChild(dueIn);
  innerDiv.appendChild(deleteButton);
  innerDiv.appendChild(completeTaskButton);

  innerDiv.setAttribute("style", "display: flex; gap: 5px; align-items: centre");

  todoDiv.appendChild(innerDiv);
  
  let borderColor = priority == "high"? "red" : priority == "medium"? "yellow" : "lightgreen";

  todoDiv.setAttribute("style",`display: flex; justify-content: space-between; border: 1px solid gray; border-left: 10px solid ${borderColor}; border-radius: 5px; margin: 1rem 0; font-size: 2rem; padding: 0 1rem; cursor: pointer`);

// Event listeners

  todoDiv.addEventListener("click", () => {
    editingState.currentEditingTodoDiv = todoDiv;
    editingState.currentEditingTodoInstance = todoTask;
    editingState.currentEditingTodoKey = todoTaskKey;
  
    // Fill form inputs with existing values
    inputs[0].value = todoTask.title;
    inputs[1].value = todoTask.description;
    inputs[2].value = format(todoTask.dueDate, "yyyy-MM-dd" );
    inputs[3].value = todoTask.project || "";
  
    for (let i = 4; i < 7; i++) {
      inputs[i].checked = (inputs[i].value === priority);
    }
  
    dialogOpen();
  });

  completeTaskButton.addEventListener("click", (e)=>{
    e.stopPropagation();
    todoTask.isCompleted = true;
    persistHelper.update(todoTask.key, JSON.stringify(todoTask));
    taskcompete(innerDiv, completeTaskButton, dueIn, taskName);
  })

  deleteButton.addEventListener("click", (e)=>{
    e.stopPropagation();
    persistHelper.delete(todoTask.key);
    mainArea.removeChild(todoDiv);
  })
  

  // display the task

  const mainArea = document.querySelector(".content");
  mainArea.setAttribute("style", "padding: 1rem")
  mainArea.appendChild(todoDiv);

}

export { taskAdderButton , dialogOpen};