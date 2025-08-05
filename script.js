// Load tasks on page load
document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const taskItem = document.createElement("div");
      taskItem.className = "task";
      if (task.completed) taskItem.classList.add("completed");

      const taskText = document.createElement("span");
      taskText.textContent = task.text;
      taskText.contentEditable = false;

      const actions = document.createElement("div");
      actions.className = "task-actions";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
        tasks[index].completed = checkbox.checked;
        saveTasks();
        renderTasks();
      });

const editBtn = document.createElement("button");
editBtn.innerHTML = "✏️";
editBtn.className = "edit-btn";
editBtn.title = "Edit Task";

let isEditing = false;

editBtn.addEventListener("click", () => {
  if (!isEditing) {
    taskText.contentEditable = true;
    taskText.focus();
    editBtn.innerHTML = "💾"; // Change to save icon while editing
    isEditing = true;
  } else {
    taskText.contentEditable = false;
    tasks[index].text = taskText.textContent.trim();
    saveTasks();
    renderTasks(); // Re-render to reset buttons/icons
  }
});


      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "❌";
      deleteBtn.className = "delete-btn";
      deleteBtn.title = "Delete Task";
      deleteBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      actions.appendChild(checkbox);
      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      taskItem.appendChild(taskText);
      taskItem.appendChild(actions);

      taskList.appendChild(taskItem);
    });
  }

  // Handle Enter in Textarea
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const text = taskInput.value.trim();
      if (text !== "") {
        tasks.unshift({ text, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = "";
      }
    }
  });

  renderTasks();
});
