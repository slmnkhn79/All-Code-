var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Admin = mongoose.mongo.Admin;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/connect', function(req,res,next){

  if(!req.body) {
    return res.json(
      {
        'error' : 'No data was sent!',
        'code' : '200'
      });
  }
  if(!req.body.username || !req.body.password || !req.body.port || !req.body.serverName){
    return res.json({
      'error' : 'Data Incomplete',
      'code' : '201'
    });
  }
  if(req.body.username.length < 6 || req.body.password.length < 6){
    return res.json({
      'error' : 'Less than 6 characters ',
      'code' : '202'
    });
  }
    var username = req.body.username;
    var password = req.body.password; 
    var port = req.body.port;
    var serverName = req.body.serverName;

    connectionString = 'mongodb://'+username+':'+password+'@'+serverName+':'+port;
    console.log(connectionString);
    
   connectionString ='mongodb://slmnkhn79:.cleanup7275@ds119164.mlab.com:19164/ngbookstore';
  console.log(connectionString);
    connect(connectionString)
    .then(
      (data) => { 
       
          res.json(data);
    })
    .catch((err)=>
    {
      res.send(err);
    });
    
    
   // console.log(connectionString);
   // res.send(connectionString);

});

function connect(connectionString){
  
  return new Promise((resolve, reject)=>
  {
    console.log('into connect');
   mongoose.connect(connectionString, {useNewUrlParser: true},function(err,connection){
     if(err){
       reject(err);
     }
     else{
       console.log('connected');
       connection.Admin.listDatabases(function(err,result){
         if(err){
           reject(err);
         }
        var out = [];
        _.each(result.databases,function(item){
          var formatted = {
            name : item.name,
            details : "/mongo-api/" + item.name,
            type : "database"
          }
          out.push(formatted);
        });
       resolve(out);
     });
    }
   });
    });
    
 
}

module.exports = router;
