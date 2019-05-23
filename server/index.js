let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

// load database ================
var Datastore = require('nedb');
var db = {};
db.feature = new Datastore({filename: "feature.db",autoload: true});
db.unique = new Datastore({filename: "unique.db",autoload: true});
db.unique.ensureIndex({fieldName: 'feature', unique :'feature'});

io.on('connection', (socket) => {
  console.log('user connected');

  var currentFeatures = 0;
  var unique = [];
  var removeInterval = setInterval(function(){
    console.log("ping! " + new Date());
    getAllFeatures(function(data){
      console.log("pong! found data ==>" + data.length);

      //Something new has arrived
      if (data.length > currentFeatures){
        console.log("Current Feature ==> " + currentFeatures);

        // Give subset of data
        const outputData = data.slice(currentFeatures);

        //Set new data length
        currentFeatures = data.length;

        //Emit new value
        console.log("new data ==>",outputData);
        socket.emit("features",outputData);
      }
    });

    getAllUnique(function(data){
      if (data.length > unique.length){
        unique = [];
        for (let i = 0; i < data.length; i++){
          console.log("index push ==>"+JSON.stringify(data[i]));
          unique.push(data[i].feature);
        }
        socket.emit("unique",unique);
      }
    });


  },1000);

  // On first load pass the inital list of unique features
  getAllUnique(function(data){
    console.log("unique==>"+JSON.stringify(data));
    for (let i = 0; i < data.length; i++){
      console.log("index push ==>"+JSON.stringify(data[i]));
      unique.push(data[i].feature);
    }
    console.log("index==>"+JSON.stringify(unique));
    socket.emit("unique",unique);
  });

  //On first load pass the inital list of features
  getAllFeatures(function(data){
    currentFeatures = data.length;
    socket.emit("features",data);
  });

  socket.on('disconnect',function(){
    console.log('disconnect');
    clearInterval(removeInterval);
  })

});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});

function getAllFeatures(callBack){
  db.feature.loadDatabase();
  db.feature.find({}).sort({Date:1}).exec(function(err,data){
    callBack(data);
  });
}

function getAllUnique(callBack){
  db.unique.loadDatabase();
  db.unique.find({},function(err,data){
    callBack(data);
  })
}
