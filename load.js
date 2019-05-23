var fs = require('fs');
var readline = require('readline');

// load database ================
var Datastore = require('nedb');
var feature = new Datastore({filename: "feature.db",autoload: true});
var unique = new Datastore({filename: "unique.db",autoload: true});
unique.ensureIndex({fieldName: 'feature', unique :'feature'});

/*feature.find({},function (err, data){
  console.log("feature==>"+JSON.stringify(data));
});*/

var index = [];

unique.find({},function (err, data){
  console.log("unique==>"+JSON.stringify(data));
  for (let i = 0; i < data.length; i++){
    console.log("index push ==>"+JSON.stringify(data[i]));
    index.push(data[i].feature);
  }
  console.log("index==>"+JSON.stringify(index));
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  rl.on('line', function (line) {
    formatAndInsert(line);
  });
});

function formatAndInsert(input){
  console.log(input);
  console.log(index);
  const now = new Date();
  let jsonData = JSON.parse(input);
  let insertObject = {};
  for (let prop in jsonData){
    insertObject = JSON.parse(JSON.stringify({}));

    // Check for unique features
    if (!index.includes(prop)){
      index.push(prop);
      // Handle unique constraint error
      unique.insert({feature:prop},function(err){
        // console.log("handle "+err);
      });
    }
    insertObject[prop] = jsonData[prop];
    insertObject.Date = now;
    feature.insert(insertObject)
  }

  //console.log("Inserted at, "+ jsonData.date);
}



