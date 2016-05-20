'use strict';

var express = require('express');
var Todo = require('../models/todo');
//var todos = require('../../mock/todos.json');

var router = express.Router();

router.get('/todos', function(req, res) {
  Todo.find({}, function(err, todos) {
    if(err) {
      return res.status(500).json({message: err.message});
    }
    res.json({todos: todos});
  });
});

module.exports = router;
