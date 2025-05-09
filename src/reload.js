import { editingState, dialogOpen } from "./dom_module";
import { Todo } from "./todo_module";
import { formatDistance, format } from "date-fns";
import { persistHelper } from "./persistence";

let indexAvailable = localStorage.getItem("0")? true : false;

export function consoleIt(){
    console.log(indexAvailable);
    
    if(indexAvailable){
        let index = 0;
        while(localStorage.getItem(index.toString())){
            let todoTask = Todo.reviewTodo(JSON.parse(localStorage.getItem(index.toString())));
            index++;
            if(!todoTask.isCompleted) display(todoTask);
        }
    }
    else{
        console.log("no index is there")
    }

}

function display(todoTask){
    // creating the block
      const todoDiv = document.createElement("div");
      const taskName = document.createElement("p");
      taskName.className = "taskName"
      taskName.innerText = todoTask.title;
      taskName.setAttribute("style", "margin: 0")
    
      todoDiv.appendChild(taskName);
    
      const innerDiv = document.createElement("div")
      const dueIn = document.createElement("p");
      dueIn.className = "dueIn";
      dueIn.innerText = `Due in ${formatDistance(todoTask.dueDate, new Date())}`;
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
      
      let borderColor = todoTask.priority == "high"? "red" : todoTask.priority == "medium"? "yellow" : "lightgreen";
    
      todoDiv.setAttribute("style",`display: flex; justify-content: space-between; border: 1px solid gray; border-left: 10px solid ${borderColor}; border-radius: 5px; margin: 1rem 0; font-size: 2rem; padding: 0 1rem; cursor: pointer`);
    
      todoDiv.addEventListener("click", () => {
        const taskAdderForm = document.querySelector(".taskAdderForm");
        let inputs = taskAdderForm.elements;

        editingState.currentEditingTodoDiv = todoDiv;
        editingState.currentEditingTodoInstance = todoTask;
        editingState.currentEditingTodoKey = todoTask.key;
      
        // Fill form inputs with existing values
        inputs[0].value = todoTask.title;
        inputs[1].value = todoTask.description;
        inputs[2].value = format(todoTask.dueDate, "yyyy-MM-dd" );
        inputs[3].value = todoTask.project || "";
      
        for (let i = 4; i < 7; i++) {
          inputs[i].checked = (inputs[i].value === todoTask.priority);
        }
      
        dialogOpen();
      });

      completeTaskButton.addEventListener("click", (e)=>{
          e.stopPropagation();
          todoTask.isCompleted = true;
          persistHelper.update(todoTask.key, JSON.stringify(todoTask));
          taskcompete(innerDiv, completeTaskButton, dueIn, taskName);
        })
      
    
      // display the task
    
      const mainArea = document.querySelector(".content");
      mainArea.setAttribute("style", "padding: 1rem")
      mainArea.appendChild(todoDiv);
    
}

export function taskcompete(innerDiv, completeTaskButton, dueIn, taskName) {
          innerDiv.removeChild(completeTaskButton);
          innerDiv.removeChild(dueIn);
          taskName.setAttribute("style", "text-decoration: line-through; margin: 0");
}
