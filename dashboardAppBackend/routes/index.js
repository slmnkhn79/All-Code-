var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var _ = require("underscore")._;
var connection ;
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
    // connect('mongodb://slmnkhn79:.cleanup7275@ds119164.mlab.com:19164/ngbookstore').then(()=>{
      listCollections()
      .then((collNames)=>
      {
       // console.log(collNames);
        var out = [];
        _.each(collNames, function(collName){
          var cleanName = collName.s.name;
           var name = collName.s.dbName;
          var formatted = {
            name : cleanName,
            details : name +"/" + cleanName,
            database : name,
            type : "collection"
          };
         // if(cleanName != "system.indexes")
            out.push(formatted);
        });
       // console.log(out);
        res.json(out);
      })
      .catch((err)=>
      {
        res.json(err);
      });
});

router.get('/getCollectionDetails/:dbName/:collectionName',(req,res,next)=>{
  var collName = req.params.collection;
  var dbName = req.params.dbName;
    getCollectionDetails(dbName,collName)
    .then((data)=>
    { 
      console.log(data);
      res.send(data);
    })
    .catch((err)=>
    {
      console.log(err);
      res.json(err);
    });
})

function connect(connectionString){
  return new Promise((resolve, reject)=>
  {
   connection = mongoose.connect(connectionString, {useNewUrlParser: true},function(err){
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
  return new Promise((resolve,reject)=>{
    mongoose.connection.db.collections(function(err, collections){
      if(err)
      reject(err);
      else{
        resolve(collections);
      }
    })

  });
 
}

function getCollectionDetails(dbName , collectionName){
  return new Promise((resolve,reject)=>{
    mongoose.connection.db.collection('books').find({}).toArray()
    .then((data)=>
    {
      resolve(data);
    })
    .catch((err)=>{
      reject(err);
    });
  });
}

module.exports = router;
