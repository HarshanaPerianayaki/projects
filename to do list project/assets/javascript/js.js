document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    
    if (taskText === "") return;

    let li = document.createElement("li");
    li.innerHTML = `<span onclick="toggleTask(this)">${taskText}</span> <button class="delete-btn" onclick="removeTask(this)">X</button>`;
    
    document.getElementById("taskList").appendChild(li);
    saveTasks();
    
    taskInput.value = "";
}

// Toggle task completion
function toggleTask(element) {
    element.classList.toggle("completed");
    saveTasks();
}

// Remove a task
function removeTask(button) {
    button.parentElement.remove();
    saveTasks();
}

// Clear all completed tasks
function clearCompleted() {
    document.querySelectorAll(".completed").forEach(task => task.parentElement.remove());
    saveTasks();
}

// Clear all tasks
function clearAll() {
    document.getElementById("taskList").innerHTML = "";
    saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.querySelector("span").classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        JSON.parse(savedTasks).forEach(task => {
            let li = document.createElement("li");
            li.innerHTML = `<span onclick="toggleTask(this)" class="${task.completed ? 'completed' : ''}">${task.text}</span> <button class="delete-btn" onclick="removeTask(this)">X</button>`;
            document.getElementById("taskList").appendChild(li);
        });
    }
}

// Allow pressing Enter to add a task
document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
