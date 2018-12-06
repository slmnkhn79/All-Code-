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
    //console.log(connectionString);
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


router.get('/helper', function(req,res,next){
    helperData()
    .then((data)=>{
      res.status(200).json(data);
    })
    .catch((err)=>{
      res.json(err);
    })
});

router.post('/update/:dbName',function(req,res,next)
{
      var dbName = req.params.dbName;
      
});

router.get('/list-data/:dbName/:limit/:skip', function (req, res, next) {
  var dbName = req.params.dbName;
  var limit = req.params.limit;
  var skip = req.params.skip;
  // console.log('into colletions');
  // connectionString= 'mongodb://slmnkhn79:.cleanup7275@ds119164.mlab.com:19164/ngbookstore';
  //   console.log(connectionString);
  //   connect(connectionString)
  //   .then(
  //     () => {  
  
  getCollectionDetails(dbName,limit,skip)
    .then((data) => {
        console.log(data);
        res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.send('err');
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

function getCollectionDetails(collectionName,l,s) {
  return new Promise((resolve, reject) => {
    mongoose.connection.db.collection(collectionName, function (error, coll) {
      coll.find({}).skip(Number(s)).limit(Number(l)).toArray(function (error, document) {
        if (error || !document) {
          console.log(error);
          reject(error);
        } else {
          resolve(document);
        }
      });
    });
  });
}

function helperData(){
  var obj = {
    "name": "Salman Khan",
        "Entry1": "One",
        "Entry2": "Two",
        "Entry3": "Three"
  };
  return new Promise((resolve, reject) => {
    mongoose.connection.db.collection('test', function (error, coll) {
      coll.save(obj,function (error, document) {
        if (error || !document) {
          console.log(error);
          reject(error);
        } else {
          resolve(document);
        }
      });
    });
  });
}

function updateDocument(collectionName,data) {
  return new Promise((resolve, reject) => {
    mongoose.connection.db.collection(collectionName, function (error, coll) {
      coll.findOneAndUpdate({_id:data._id} , {$set: data},function (error, document) {
        if (error || !document) {
          console.log(error);
          reject(error);
        } else {
          resolve(document);
        }
      });
    });
  });
}

module.exports = router;
