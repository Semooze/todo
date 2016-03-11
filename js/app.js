var filters = {
  do: function(todos) {
    return todo.status === 'do';
  },
  doing: function(todos) {
    return todos.filter(function(todo) {
      return todo.status === 'doing';
    });
  },
  done: function(todos) {
    return todos.filter(function(todo) {
      return todo.status === 'done';
    });
  },
};


new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todos: [],
    header: 'tester',
    footer: 'footer'
  },
  computed: {
   all: function() {
     return this.todos;
   },
   remaining: function () {
		return filters.do(this.todos).length;
	 },
   doingFilter: function() {
    return
   }
  },
  methods: {
    addTask: function() {
      var text = this.newTodo.trim();
      if (text) {
        this.todos.push({text: text, status: 'do'});
        this.newTodo = '';
      }
    },
    removeTask: function(index) {
      this.todos.splice(index, 1);
    },
    doingTask: function(index) {
      this.todos[index].status = 'doing';
    },
    completeTask: function(index) {
      this.todos[index].status = 'done';
    }
  }
});
