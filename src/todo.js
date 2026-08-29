export class Todo {
  constructor(title, dueDate) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.dueDate = dueDate;
  }
}
