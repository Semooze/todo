Vue.directive('todo-focus', function (value) {
  if (!value) {
    return;
  }
  var el = this.el;
  Vue.nextTick(function () {
    el.focus();
  });
});


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
  el: '.todoapp',
  data: {
    newTodo: '',
    todos: [],
    editedTodo: null,
    visibility: todoStorage.fetch()
  },
  watch: {
		visibility: {
			handler: todoStorage.save
		}
	},
  computed: {
    filteredTasks: function () {
      return filters[this.visibility](this.todos);
    },
    remaining: function () {
      return filters.active(this.todos).length;
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
    removeTask: function(todo) {
      console.log('in');
      var todos = this.todos;
      todos.forEach(function (t, index) {
        console.log(index, t);
        if (todo === t) {
          console.log('match');
          return todos.splice(index, 1);
        }
      });
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
    completeTask: function(todo) {
      todo.status = 'completed';
    },
    removeAllTasks: function () {
      this.todos = [];
    },
    setVisibility: function (value) {
      this.visibility = value;
    },
    // loadJsonfile: function(data) {
    //   console.log(data);
    //   var mydata = JSON.parse(data);
    // 	alert(mydata[0].name);
    // 	alert(mydata[0].age);
    // }
  }
});
