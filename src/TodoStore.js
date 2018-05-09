import { observable, computed } from "mobx";

class Todo {
  @observable id;
  @observable value;
  @observable complete;

  constructor(value) {
    this.value = value;
    this.id = Date.now();
    this.complete = false;
  }
}

class TodoStore {
  @observable todos = [];
  @observable filter = "";
  @computed
  get filteredTodos() {
    var matchesFilter = new RegExp(this.filter, "i");
    return this.todos.filter(
      todo => !this.filter || matchesFilter.test(todo.value)
    );
  }

  createTodo(value) {
    this.todos.push(new Todo(value));
  }

  clearCompleate = () => {
    const incompleteTodos = this.todos.filter(todo => !todo.complete);
    this.todos.replace(incompleteTodos);
  };
}

var store = (window.store = new TodoStore());

export default store;
