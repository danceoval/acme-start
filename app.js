var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var swig = require('swig');
swig.setDefaults({cache: false });
var models = require('./db').models;
var Department = models.Department;

var app = express();
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

module.exports = app;

app.get('/', function(req, res, next){
  Department.getDefault()
    .then(function(department){
      res.render('index', {
        title: 'Home',
        defaultDepartment: department,
        mode: 'home'
      });
    })
    .catch(next);
});

app.use('/departments', require('./routes/departments'));
app.use('/customers', require('./routes/customers'));
