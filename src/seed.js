'use strict';

var Todo = require('./models/todo.js');


var todos = ['walk this way',
             'clean desk',
             'more stuff'];

todos.forEach(function(todo, index) {
  Todo.find({'name': todo}, function(err, todos) {
    if (!err && !todos.length) {
      Todo.create({completed: false, name: todo});
    };
  });
});
