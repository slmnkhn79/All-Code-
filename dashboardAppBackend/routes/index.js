var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//var Admin = mongoose.mongo.Admin;
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/connect', function(req,res,next){

  // if(!req.body) {
  //   return res.json(
  //     {
  //       'error' : 'No data was sent!',
  //       'code' : '200'
  //     });
  // }
  // if(!req.body.username || !req.body.password || !req.body.port || !req.body.serverName){
  //   return res.json({
  //     'error' : 'Data Incomplete',
  //     'code' : '201'
  //   });
  // }
  // if(req.body.username.length < 6 || req.body.password.length < 6){
  //   return res.json({
  //     'error' : 'Less than 6 characters ',
  //     'code' : '202'
  //   });
  // }
  //   var username = req.body.username;
  //   var password = req.body.password; 
  //   var port = req.body.port;
  //   var serverName = req.body.serverName;
  //   var dbName = req.body.dbName;

  //   connectionString = 'mongodb://'+username+':'+password+'@'+serverName+':'+port+'/'+dbName;
    connectionString= 'mongodb://slmnkhn79:.cleanup7275@ds119164.mlab.com:19164/ngbookstore';
    console.log(connectionString);
    connect(connectionString)
    .then(
      () => {   
        res.json({
          'status':'connected',
          'code' : 999
        });
      
    })
    .catch((err)=>
    {
      res.send(err);
    });
    
    
 

});

router.get('/list-collections', function(req,res,next){
  // console.log('into colletions');
  // connectionString= 'mongodb://slmnkhn79:.cleanup7275@ds119164.mlab.com:19164/ngbookstore';
  //   console.log(connectionString);
  //   connect(connectionString)
  //   .then(
  //     () => {   
        listCollections()
        .then((data)=>{
          console.log(data);
          res.json(data)
        })
        .catch(err=>{
          res.send(err);
        });
      
    // })
    // .catch((err)=>
    // {
    //   res.send(err);
    // });
    
});

function connect(connectionString){
  return new Promise((resolve, reject)=>
  {
   mongoose.connect(connectionString, {useNewUrlParser: true},function(err){
     if(err){
      reject(err);
     }
     else{
       resolve();
     }
    });
  });
}

function listCollections(){
  console.log('here00');
  return new Promise((resolve,reject)=>{
          mongoose.connection.db.collections(function(error, collections) {
            if (error) {
              reject(error);
             // throw new Error(error);
            } else {
              
              resolve(collections);
            }
        });
     });
  }

module.exports = router;
