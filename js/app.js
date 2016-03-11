var filters = {
  all: function (todos) {
    return todos;
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed;
    });
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed;
    });
  }
};

new Vue({
  el: '#todoapp',
  data: {
    newTodo: '',
    todos: [],
  },
  computed: {
    filteredTodos: function () {
      return filters[this.visibility](this.todos);
    },
    remaining: function () {
      return filters.active(this.todos).length;
    },
    allDone: {
      get: function () {
        return this.remaining === 0;
      },
      set: function (value) {
        this.todos.forEach(function (todo) {
          todo.completed = value;
        });
      }
    }
  },
  methods: {
    addTask: function() {
      var text = this.newTodo.trim();
      if (text) {
        this.todos.push({text: text, status: 'active', createTime: new Date().getTime()});
        this.newTodo = '';
      }
    },
    removeTask: function(index) {
      this.todos.splice(index, 1);
    },
    completeTask: function(index) {
      this.todos[index].status = 'completed';
    }
  }
});
