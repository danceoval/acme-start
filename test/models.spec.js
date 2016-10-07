var expect = require('chai').expect;
var db = require('../db');
var models = db.models;
var User = models.User;
var Department = models.Department;
describe('models', function(){

  before(function(done){
    db.sync()
      .then(function(){
        //console.log('tables are created');
        done();
      })
      .catch(done);
  });
  var moe, larry, accounting, engineering;

  beforeEach(function(done){
    db.seed()
      .spread(function(_moe, _larry, _accounting, _engineering){
        //console.log('seeded');
        moe = _moe;
        larry = _larry;
        accounting = _accounting;
        engineering = _engineering;
        done();
      })
      .catch(done);
  });

  it('exists', function(){
    expect(Department).to.be.ok;
    expect(User).to.be.ok;
  });

  describe('employees in accounting', function(){
    it('accounting has no employees', function(done){
      User.findEmployees(accounting.id)
        .then(function(users){
          expect(users).to.eql([]);
          done();
        })
        .catch(done);
    });
  });

  describe('setDefault', function(){
    it('Engineering can be set as default', function(done){
      engineering.setDefault()
        .then(function(engineering){
          return Department.getDefault();
        })
        .then(function(engineering){
          expect(engineering.isDefault).to.be.true;
          done();
        })
        .catch(done);
    });
  });

  describe('moe', function(){
    it('moe is moe', function(){
      expect(moe.name).to.equal('Moe');
    });

    describe('moe can be added to accounting', function(){
      it('moe has a department of accounting', function(done){
        moe.departmentId = accounting.id;
        moe.save()
          .then(function(){
            return User.findById(moe.id, {
              include: [ Department ]
            });
          })
          .then(function(moe){
            expect(moe.department.name).to.equal('Accounting');
            done();
          })
          .catch(done);
      });
    });
  });


});
