'use strict';

var angular = require('angular');

angular.module("todoListApp")
.controller('mainCtrl', function($scope, dataService){

  dataService.getTodos(function(response) {
    var todos = response.data.todos;
    $scope.todos = todos;
  });

  $scope.addTodo = function() {
    var todo = {name: "A new todo"};
    $scope.todos.unshift(todo);
  };

});
