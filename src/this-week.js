import { allTodos } from "./project-todo-display-controller.js";
import { output } from "./project-todo-display-controller.js";
import { isThisWeek, parseISO } from "date-fns";
import { addTodoBtnDiv } from "./project-todo-display-controller.js";
import { contentTab } from "./project-display-controller.js";

const weekDiv = document.getElementById("week-div");

weekDiv.addEventListener("click", () => {
  output.innerHTML = "";
  addTodoBtnDiv.innerHTML = "";
  contentTab.textContent = "This Week";

  const thisWeekDue = allTodos.filter((todo) =>
    isThisWeek(parseISO(todo.dueDate)),
  );

  thisWeekDue.forEach((todo) => {
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
});
