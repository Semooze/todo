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
    visibility: todoStorage.fetch(),
    selectedTodo: null
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
    selectTask: function (index) {
      this.selectedTodo = index;
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
      this.selectedTodo = null;
      this.visibility = value;
    },
    importTasks: function(e) {
      var todos = this.todos;
      var files = e.target.files;
      for (var i = 0, file; file = files[i]; i++) {

        if (!file.type.match('application/json')) {
          continue;
        }
        var reader = new FileReader();
        reader.onload = function(e) {
          var data = JSON.parse(e.target.result);
          if (!data.todos) return alert('content format is not match');
          data.todos.forEach(function (todo) {
            todos.push(todo);
          });
        };
        reader.onerror = (function(error) {
          if (error) return alert(error);
        })();
        reader.readAsText(file, 'UTF-8');
      }
    },
    exportTasks: function () {
      var data = {};
      data.todos = this.todos;
      var a         = document.createElement('a');
      a.href        = 'data:application/json;charset=utf-8,' +  encodeURIComponent(JSON.stringify(data));
      a.target      = '_blank';
      a.download    = 'todos.json';

      document.body.appendChild(a);
      a.click();
    },
    saveTasksIntoDb: function () {
      var data = JSON.stringify(this.todos);
      var xhttp = new XMLHttpRequest();
      xhttp.open('POST', '/tasks/save', true);
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhttp.send("todos=" + data);
      xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
          alert(xhttp.responseText);
        }
      }
    },
    loadTasksFromDb: function () {
      var todos = this.todos;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
          try {
            var datas = JSON.parse(xhttp.responseText);
          } catch (e) {
            alert(e);
          }
          datas.forEach(function(data) {
            data.createTime = +data.createTime;
            todos.push(data);
          });
        }
      };
      xhttp.open('GET', '/tasks/load', true);
      xhttp.send();
    }
  }
});
