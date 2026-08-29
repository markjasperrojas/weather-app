export class Project {
  constructor(projectName) {
    this.id = crypto.randomUUID();
    this.projectName = projectName;
    this.todoList = [];
  }
}
