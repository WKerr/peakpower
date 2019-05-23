setInterval(function(){
  console.log(JSON.stringify({"Tempurature": Math.random() * 50,"Humidity": Math.random() * 70}));
},1000);
