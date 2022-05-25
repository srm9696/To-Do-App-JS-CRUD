let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let edit = document.querySelector(".fa-pen");
let recordExist = false;
let id;

textInput.focus(); //Not working

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value == "") {
    msg.innerHTML = "Task cannot be empty";
  } else {
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [];
let acceptData = () => {
  if (!recordExist) {
    data.push({
      text: textInput.value,
      date: dateInput.value,
      description: textarea.value,
    });
  } else {
    data.splice(id, 1, {
      text: textInput.value,
      date: dateInput.value,
      description: textarea.value,
    });
    recordExist = false;
  }

  localStorage.setItem("data", JSON.stringify(data));
  createTask();
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

let createTask = () => {
  tasks.innerHTML = "";
  data.forEach(
    (cur, i) =>
      (tasks.innerHTML += `
    <div id='${i}'>
        <span>${cur.text}</span>
        <span>${cur.date}</span>
        <p>${cur.description}</p>
        <span class="options">
            <i class="fas fa-pen" onclick="editTask(this)" data-bs-toggle="modal"
            data-bs-target="#form"></i>
            <i class="fas fa-trash" onclick="deleteTask(this);createTask()" ></i>
        </span>
    </div> 
    `)
  );

  resetForm();
};

let editTask = (task) => {
  let selectedTask = task.parentElement.parentElement;
  id = task.parentElement.parentElement.id;
  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;
  recordExist = true;
};

let deleteTask = (task) => {
  task.parentElement.parentElement.remove();
  data.splice(task.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  createTask();
})();
