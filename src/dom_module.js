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

export { taskAdderButton };