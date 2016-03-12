var filters = {
  all: function (todos) {
    return todos;
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return todo.status === 'active';
    });
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.status === 'completed';
    });
  }
};

new Vue({
  el: '#todoapp',
  data: {
    newTodo: '',
    todos: [],
    editedTodo: null,
    visibility: 'all'
  },
  computed: {
    filteredTasks: function () {
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
    editTask: function (todo) {
      this.beforeEditCache = todo.text;
      this.editedTodo = todo;
    },
    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.text = todo.text.trim();
      if (!todo.text) {
        this.removeTodo(todo);
      }
    },
    cancelEdit: function (todo) {
      this.editedTodo = null;
      todo.text = this.beforeEditCache;
    },
    completeTask: function(index) {
      this.todos[index].status = 'completed';
    }
  }
});

// Vue.directives: {
// 	'todo-focus': function (value) {
// 		if (!value) {
// 			return;
// 		}
// 		var el = this.el;
// 		Vue.nextTick(function () {
// 			el.focus();
// 		});
// 	}
// }
Vue.directive('todo-focus', {
  function (value) {
    if (!value) {
      return;
    }
    var el = this.el;
    Vue.nextTick(function () {
      el.focus();
    });
  }
})
