var Sequelize = require('sequelize');
var Promise = require('bluebird');

var db = new Sequelize(process.env.DATABASE_URL, {
  logging: false
});

var User = db.define('user', {
  
}, {
  classMethods: {
    createCustomer: function(id){
    
    },
    createEmployee: function(id){
      
    },
    getCustomersViewModel: function(){
      
    },
    findEmployees: function(departmentId){
     
    }
  }
});

var Department = db.define('department', {
  
}, {
  instanceMethods: {
    
  },
  classMethods: {
    remove: function(id){
     
    },
    getDepartmentViewModel: function(id){
      
    },
    getDefault: function(){
     
    }
  }
});

User.belongsTo(Department);
Department.hasMany(User);

function sync(){
  return db.sync({force: true});
}

function seed(){
  return User.destroy({ where: {} })
    .then(function(){
      return Department.destroy({ where: {} });
    })
    .then(function(){
      return Promise.all([
          User.create({ name: 'Moe' }),
          User.create({ name: 'Larry' }),
          Department.getDefault(),
          Department.create({ name: 'Engineering' })
      ]);
    });

}

module.exports = {
  seed: seed,
  sync: sync,
  models: {
    User: User,
    Department: Department 
  }
}
