var router = require('express').Router();
var Promise = require('bluebird');
var models = require('../db').models;
var User = models.User;
var Department = models.Department;

module.exports = router;

