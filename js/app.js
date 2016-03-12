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
    },
    date: function () {
      var dateObj = new Date();
      var date = dateObj.getDate();
      var month = dateObj.getMonth() + 1;
      var year = dateObj.getFullYear();
      var result = date + '/' + month + '/' + year;
      return result;
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
      var todos = this.todos;
      todos.forEach(function (t, index) {
        if (todo === t) {
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
    loadJsonfile: function(e) {
      var todos = this.todos;
      var files = e.target.files;
      for (var i = 0, file; file = files[i]; i++) {

        if (!file.type.match('application/json')) {
          continue;
        }
        var reader = new FileReader();
        reader.onload = function(e) {
          var data = JSON.parse(e.target.result);
          if (!data.todos) return console.error('content format is not match');
          data.todos.forEach(function (todo) {
            todos.push(todo);
          });
        };
        reader.onerror = (function(error) {
          if (error) return console.log(error);
        })();
        reader.readAsText(file, 'UTF-8');
      }
    }
  }
});
