const express = require("express");
const path = require("path");
const axios = require("axios");
const qs = require("querystring"); //built-in querystring module for manipulating query strings
const ejs = require("ejs");
var bodyParser = require('body-parser');

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || "8080";


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//set up static path (for use with CSS, client-side JS, and image files)
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//HTTP server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  // getGeo();
  getPlaces(res);
});

var lat;
var lng;

function getPlaces(res){

  const options = {
    method: 'GET',
    url: 'https://trueway-places.p.rapidapi.com/FindPlacesNearby',
    params: {location: `${lat},${lng}`, type: 'cafe', radius: '150', language: 'en'},
    headers: {
      'X-RapidAPI-Key': '49b3d82605msh88c216e62d3770cp13f60cjsnec91372acf2e',
      'X-RapidAPI-Host': 'trueway-places.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
    res.render("index", {places: response.data})
  }).catch(function (error) {
    console.error(error);
  });

  const options2 = {
    method: 'GET',
    url: 'https://trueway-geocoding.p.rapidapi.com/Geocode',
    params: {address: 'toronto, ontario', language: 'en'},
    headers: {
      'X-RapidAPI-Key': '49b3d82605msh88c216e62d3770cp13f60cjsnec91372acf2e',
      'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
    }
  };
  
  axios.request(options2).then(function (response) {
    lat = response.data.results[0].location.lat;
    lng = response.data.results[0].location.lng;
    console.log(lat, lng);
  })
  
}

// function getData(res) { 
//   var promiseArr = []
//   var options = {
//   method: 'GET',
//   uri: 'https://trueway-places.p.rapidapi.com/FindPlacesNearby',
//   params: {location: `${lat},${lng}`, type: 'cafe', radius: '150', language: 'en'},
//   headers: {
//     'X-RapidAPI-Key': '49b3d82605msh88c216e62d3770cp13f60cjsnec91372acf2e',
//     'X-RapidAPI-Host': 'trueway-places.p.rapidapi.com'
//     }
//   };
//   request(options).then(function(apires){
//      console.log("complete 1");
//      res.render("index", {places: response.data})
//       var obj = JSON.parse(apires);
//       obj.data.forEach(function(entry) {        
//           var p = findMore(entry.id)
//           promiseArr.push(p)
//       });
//   }).then(function(){
//              Promise.all(promiseArr).then(function(){
//              console.log("this is all done")
//              })
//           })
// }


// function findMore(id) {
//   var options = {
//   method: 'GET',
//   uri: 'https://trueway-geocoding.p.rapidapi.com/Geocode',
//     params: {address: 'Cairo, Egypt', language: 'en'},
//     headers: {
//       'X-RapidAPI-Key': '49b3d82605msh88c216e62d3770cp13f60cjsnec91372acf2e',
//       'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
//     }
//   };
//   return request(options).then(function(apires){
//      console.log("complete 2");
//       var obj = JSON.parse(apires);
//       lat = response.data.results[0].location.lat;
//     lng = response.data.results[0].location.lng;
//   })
// }