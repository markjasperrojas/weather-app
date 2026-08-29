import { Todo } from "./todo.js";
import { allProjects, savedProjects } from "./project-display-controller.js";

let allTodos = loadTodos();
const projectTodoDialog = document.getElementById("project-todo-dialog");
const addTodoBtnDiv = document.querySelector(".todos-plus-btn-div");
const closeProjectTodoBtn = document.getElementById("close-project-todo-modal");
const projectTodoForm = document.getElementById("project-todo-form");
const output = document.querySelector(".output");

closeProjectTodoBtn.addEventListener("click", () => {
  projectTodoDialog.close();
});

projectTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const projectTodoTitle = document.getElementById("project-todo-title").value;
  const dueDate = document.getElementById("due-date").value;

  const newTodo = new Todo(projectTodoTitle, dueDate);

  allTodos.push(newTodo);

  savedTodos();

  const project = allProjects.find((p) => p.id === addTodoBtnDiv.id);

  project.todoList.push(newTodo);

  savedProjects();

  document.getElementById("project-todo-title").value = "";
  document.getElementById("due-date").value = "";

  renderTodos(project);

  projectTodoDialog.close();
});

function renderProjectContents(div, contentTab, project) {
  div.addEventListener("click", () => {
    if (allProjects.length === 0) {
      output.innerHTML = "";
      addTodoBtnDiv.innerHTML = "";
      contentTab.textContent = "All";

      return;
    } else if (!allProjects.some((item) => item.id === project.id)) {
      output.innerHTML = "";
      addTodoBtnDiv.innerHTML = "";
      contentTab.textContent = "All";

      allTodos.forEach((todo) => {
        const div = document.createElement("div");
        const p = document.createElement("p");
        const span = document.createElement("span");

        div.classList.add("todo-output");
        p.textContent = todo.title;
        span.textContent = todo.dueDate;

        div.appendChild(p);
        div.appendChild(span);
        output.appendChild(div);
      });

      return;
    }

    addTodoBtnDiv.innerHTML = "";

    const addTodoBtn = document.createElement("button");
    addTodoBtn.textContent = "+";

    addTodoBtn.addEventListener("click", () => {
      projectTodoDialog.showModal();
    });

    addTodoBtnDiv.appendChild(addTodoBtn);

    addTodoBtnDiv.id = project.id;

    contentTab.textContent = project.projectName;

    renderTodos(project);
  });
}

function renderTodos(project) {
  output.innerHTML = "";

  project.todoList.forEach((todo) => {
    const mainDiv = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");
    const p = document.createElement("p");
    const span = document.createElement("span");
    const removeTodoBtn = document.createElement("button");
    const checkTodoBtn = document.createElement("button");

    mainDiv.classList.add("todo-output");
    div2.classList.add("remove-todo");
    div3.classList.add("check-todo");

    p.textContent = todo.title;
    span.textContent = todo.dueDate;
    removeTodoBtn.textContent = "x";

    removeTodoBtn.addEventListener("click", () => {
      project.todoList = project.todoList.filter((item) => item.id !== todo.id);

      const remainingTodos = allTodos.filter((item) => item.id !== todo.id);
      allTodos.length = 0;
      allTodos.push(...remainingTodos);

      savedProjects();
      savedTodos();

      renderTodos(project);
    });

    checkTodoBtn.addEventListener("click", () => {
      project.todoList = project.todoList.filter((item) => item.id !== todo.id);

      const remainingTodos = allTodos.filter((item) => item.id !== todo.id);
      allTodos.length = 0;
      allTodos.push(...remainingTodos);

      savedProjects();
      savedTodos();

      renderTodos(project);
    });

    div3.appendChild(checkTodoBtn);
    div3.appendChild(p);
    div2.appendChild(span);
    div2.appendChild(removeTodoBtn);
    mainDiv.appendChild(div3);
    mainDiv.appendChild(div2);

    output.appendChild(mainDiv);
  });
}

function loadTodos() {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
}

function savedTodos() {
  localStorage.setItem("todos", JSON.stringify(allTodos));
}

function setAllTodos(newTodos) {
  allTodos = newTodos;
}

export { allTodos, output, addTodoBtnDiv, renderProjectContents, savedTodos };
