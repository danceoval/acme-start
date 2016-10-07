var server = require('http').createServer(require('./app'));
var db = require('./db');

var port = process.env.PORT || 3000;

if(process.env.SYNC){
  db.sync()
    .then(function(){
      console.log('tables created');
    });
}

server.listen(port, function(){
  console.log('listening on port ' + port);
});
