var router = require('express').Router();
var models = require('../db').models;
var Department = models.Department;
var User = models.User;
var Promise = require('bluebird');

module.exports = router;

