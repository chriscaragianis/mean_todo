webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module("todoListApp", []);

	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);



/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module("todoListApp")
	.controller('mainCtrl', function($scope, $log, $interval, dataService){

	  $scope.seconds = 0;

	  $scope.counter = function() {
	    $scope.seconds++;
	    $log.log($scope.seconds + ' seconds have passed');
	  };

	  $interval($scope.counter, 1000, 10);
	  dataService.getTodos(function(response) {
	    var todos = response.data.todos;
	    $scope.todos = todos;
	  });

	  $scope.addTodo = function() {
	    var todo = {name: "A new todo"};
	    $scope.todos.unshift(todo);
	  };

	});


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	angular.module('todoListApp')
	.controller('todoCtrl', function($scope, dataService) {
	  $scope.deleteTodo = function() {
	    $scope.todos.splice(index, 1);
	    dataService.deleteTodo(todo);
	  };

	  $scope.saveTodos = function() {
	    var filteredTodos = $scope.todos.filter(function(todo) {
	      if (todo.edited) {
	        return todo;
	      };
	    });
	    dataService.saveTodos(filteredTodos)
	    .finally($scope.resetTodoState());
	  };

	  $scope.resetTodoState = function() {
	    $scope.todos.forEach(function(todo) {
	      todo.edited = false;
	    });
	  };
	});


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('todoListApp')
	.directive('todos', function() {
	  return {
	    templateUrl: 'templates/todos.html',
	    controller: 'todoCtrl',
	    replace: true
	  }
	});



/***/ },
/* 6 */
/***/ function(module, exports) {

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


/***/ }
]);