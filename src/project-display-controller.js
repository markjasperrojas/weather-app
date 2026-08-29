import { Project } from "./project.js";
import { todoIcon } from "./todo-icon.js";
import { Todo } from "./todo.js";
import { renderProjectContents } from "./project-todo-display-controller.js";
import { allTodos, savedTodos } from "./project-todo-display-controller.js";
import { output, addTodoBtnDiv } from "./project-todo-display-controller.js";

let allProjects = loadProjects();

const projectDialog = document.getElementById("project-dialog");
const openProjectBtn = document.getElementById("show-project-modal");
const closeProjectBtn = document.getElementById("close-project-modal");
const projectForm = document.getElementById("project-form");
const showProjects = document.querySelector(".show-projects");
const contentTab = document.getElementById("content-tab");

openProjectBtn.addEventListener("click", () => {
  projectDialog.showModal();
});

closeProjectBtn.addEventListener("click", () => {
  projectDialog.close();
});

projectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const projectTitle = document.getElementById("project-title").value;

  const project = new Project(projectTitle);

  allProjects.push(project);

  savedProjects();

  document.getElementById("project-title").value = "";

  renderProjects();

  projectDialog.close();
});

function renderProjects() {
  showProjects.innerHTML = "";

  allProjects.forEach((project) => {
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    const span = document.createElement("span");
    const removeProjectBtn = document.createElement("button");

    div.classList.add("tab");
    div2.innerHTML = todoIcon;
    span.textContent = project.projectName;
    removeProjectBtn.textContent = "x";

    removeProjectBtn.addEventListener("click", () => {
      const result = allTodos.filter((item1) => {
        return !project.todoList.some((item2) => item2.id === item1.id);
      });

      allTodos.length = 0;
      allTodos.push(...result);
      savedTodos();

      allProjects = loadProjects();

      allProjects = allProjects.filter((item) => item.id !== project.id);

      savedProjects();

      renderProjects();
    });

    div2.appendChild(span);
    div.appendChild(div2);
    div.appendChild(removeProjectBtn);
    showProjects.appendChild(div);

    renderProjectContents(div, contentTab, project);
  });
}

function loadProjects() {
  const savedProjects = localStorage.getItem("projects");
  return savedProjects ? JSON.parse(savedProjects) : [];
}

function savedProjects() {
  localStorage.setItem("projects", JSON.stringify(allProjects));
}

function setAllProjects(newProjects) {
  allProjects = newProjects;
}

export {
  allProjects,
  contentTab,
  renderProjects,
  loadProjects,
  savedProjects,
  setAllProjects,
};
