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

router.post('/connect', function(req,res,next){
  console.log(req.body);
  if(!req.body) {
    return res.json(
      {
        'error' : 'No data was sent!',
        'code' : '200'
      });
  }
  if(!req.body.username || !req.body.password || !req.body.portNumber || !req.body.serverName){
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
    var port = req.body.portNumber;
    var serverName = req.body.serverName;
    var dbName = req.body.dbName;

    connectionString = 'mongodb://'+username+':'+password+'@'+serverName+':'+port+'/'+dbName;
    //connectionString= 'mongodb://slmnkhn79:.cleanup7275@ds119164.mlab.com:19164/ngbookstore';
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
  //var query = req.params.query;

  getCollectionDetails(dbName,limit,skip,{})
    .then((data) => {
       // console.log(data);
        res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.send('err');
    });

 

});
router.post('/list-data/:dbName/:limit/:skip', function (req, res, next) {
  var dbName = req.params.dbName;
  var limit = req.params.limit;
  var skip = req.params.skip;
  var query = req.body;
  console.log(query);
  getCollectionDetails(dbName,limit,skip,query)
    .then((data) => {
       // console.log(data);
        res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.send('err');
    });

 

});

router.put("/:collName/updateData",(req,res,next)=>{
    var udpatedData = req.body;
    var collName = req.params.collName;
    //console.log(data);
    updateDocument(collName,udpatedData)
    .then((newData)=>{
      res.json(newData);
    })
    .catch((err)=>{
      console.log(err);
      res.send('Error');
    });
});

router.post('/:collName/addDocument',(req,res,next)=>{
    var data = req.body;
    console.log(req.body);
    var collName = req.params.collName;
  if ( Object.keys(data).length > 0) {
    addDocument(data, collName)
      .then((data) => {
        res.send(data.ops);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  } else
        res.send('Empty JSON');

  
});

router.delete('/:collName/:id',function(req,res,next){
  var id = req.params.id;
  var collName = req.params.collName;
  deleteDocument(collName, id)
  .then(()=>{
      res.send('Deleted!');
  })
  .catch((err)=>{
    res.send(err);
  });
});
router.get('/getSchema/:collName', (req, res, next) => {
  var collName = req.params.collName;
  getCollectionDetails(collName, 0, 0, {})
    .then((data) => {
      // console.log(data);
      var biggestJson = {};
      //  var sendResponse =  _.after(data.length , function(){
      //res.send("Length"+data.length);
      // });
      var counter = 0;
      var keys = [];
      _.each(data, function (d) {
        //var d1 =d;
        //console.log(d1);
        // if(d1.length > biggestJson.length)
        // console.log(d1.length);
        //       {
        //         biggestJson = d1;
        //       }
        //       if(counter++ == data.length){
        //         res.status(200).json(biggestJson)
        //       }
        // sendResponse;
        if (counter++ == 1) {
          keys = Object.keys(d);
        }
       // console.log(keys);
        var tempKeys = Object.keys(d);
        tempKeys.forEach(element => {
          if (!keys.includes(element)) {
            keys.push(element);
          }
        });
        if (counter == data.length) {
          res.status(200).json(keys)
        }
      });
      //res.send(keys);

    })
    .catch((err) => {
      console.log(err);
      res.send('err');
    });
});
router.get('/disconnect',(req,res,next)=>{
mongoose.connection.close();
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

function getCollectionDetails(collectionName,l,s,q) {
//console.log(q);
  return new Promise((resolve, reject) => {
    mongoose.connection.db.collection(collectionName, function (error, coll) {
      coll.find(q).skip(Number(s)).limit(Number(l)).toArray(function (error, document) {
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
 // console.log(collectionName);
  return new Promise((resolve, reject) => {
    mongoose.connection.db.collection(collectionName, function (error, coll) {
     // updatedData = data.slice(1,data.length);
    //  uData = [];
    //  uData =data.toArray();
    //   uDataNew = uData.slic
    console.log('---------');
    var id = mongoose.mongo.ObjectId(data._id);
    console.log(id);
    delete data._id;
    //console.log(data);
      coll.findOneAndUpdate({_id:id} ,  {$set: data} ,{returnOriginal:true}, function (error, document) {
        if (error || !document) {
          console.log(error);
          reject(error);
        } else {
          resolve(document.value);
        }
      });
    });
  });
}


function addDocument(data, collName){
  return new Promise((resolve,reject)=>{
    mongoose.connection.db.collection(collName, function (error, coll) {
       coll.insertOne(data , function (error, result) {
         if (error || !result) {
           console.log(error);
           reject(error);
         } else {
           resolve(result);
         }
       });
     });
  });
}

function deleteDocument( collName ,did){
  return new Promise((resolve, reject) => {
    mongoose.connection.db.collection(collName, function (error, coll) {
    console.log('---------');
    var id = mongoose.mongo.ObjectId(did);
    console.log(id);
    //console.log(data);
      coll.findOneAndDelete({_id:id} , function (error) {
        if (error ) {
          console.log(error);
          reject(error);
        } else {
          resolve();
        }
      });
    });
  });
}
module.exports = router;
