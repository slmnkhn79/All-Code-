var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var _ = require('underscore');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/connect', (req,res,next)=>{
  const dbName = 'ngbookstore';
      connect()
      .then((client)=>
      {
        var db1 = client.db(dbName);
      db1.listCollections().toArray(function(err, items) {
        if(err){
          console.log(err);
         res.send(err);
        }
        else{       
        var out = [];
         _.each(items, function(key){
            var formatted = {
              name : key.name,
              dbName : dbName
            }
           // if(formatted.name != 'system.indexes')
            out.push(formatted);
         });
         
         res.send(out);
        }
      })
    })
      .catch((err)=>{
        res.send(err);
        console.log(err);
      });
});

router.get('/getDetails/:colName',function(req,res,next){
  var colName = req.params.colName;
  console.log(colName);
    connect()
    .then((client)=>{
        var db1 =  client.db(colName);
        var coll = db1.collection(colName);
        coll.find().toArray(function(err, docs) {
          if(err) {
          console.log(err);
          res.send(err)
          }
          else{
            console.log(docs);
            res.send(docs);
          }
        });
    })
    .catch((err)=>{
      res.send(err);
    });
});


function connect(){
  return new Promise((resolve,reject)=>{
    const url = 'mongodb://slmnkhn79:.cleanup7275@ds119164.mlab.com:19164/ngbookstore?authMode=scram-sha1';
    MongoClient.connect(url,{ useNewUrlParser: true })
    .then((client)=>{
      console.log('connectes');
      // var db1 = client.db(dbName);
      // db1.listCollections().toArray(function(err, items) {
      //   if(err){
      //     console.log(err);
      //     reject(err);
      //   }
      //   else{
          
      //     resolve(items);
      //   }
      //});
      resolve(client);
    })
    .catch((err)=>
    {
        reject(err);
    })
  });
}

module.exports = router;
