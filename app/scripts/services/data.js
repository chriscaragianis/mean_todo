'use strict';

angular.module("todoListApp")

.service('dataService', function($http, $q) {
  this.helloConsole = function() {
    console.log("LOG THIS service guy");
  };

  this.getTodos = function(callback) {
    $http.get('/api/todos')
      .then(callback);
  };

  this.deleteTodo = function(todo) {
    console.log("the " + todo.name + " todo has been deleted");
  };

  this.saveTodos = function(todos) {
    var queue = [];
    todos.forEach(function(todo) {
      var request;
      if (!todo._id){
        request = $http.post('/api/todos', todo);
      };
      queue.push(request);
    });
    return $q.all(queue).then(function(results) {
      console.log("I saved " + todos.length + " todos!");
    });
  };
});
