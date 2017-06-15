
const request = require('request');


var getWeather = (lat, lng, callback) =>{

  request({
    url: "https://api.darksky.net/forecast/67a46aae5ff4cc9578577b884aca644c/"+lat+","+lng,
    json:true

  },(error,response, body) =>{
    if (!error && response.statusCode === 200) {
      callback(undefined,{
        temperature:body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
    });
  }else{
      callback("Unable to get temperature");
    }
  });





};

module.exports.getWeather = getWeather;

//67a46aae5ff4cc9578577b884aca644c
