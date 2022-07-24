const express = require("express");
const path = require("path");
const axios = require("axios");
const qs = require("querystring"); //built-in querystring module for manipulating query strings
const ejs = require("ejs");
const bodyParser = require('body-parser');

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
  getPlaces(res);
});


function getPlaces(res){

  const options = {
    method: 'GET',
    url: 'https://trueway-places.p.rapidapi.com/FindPlacesNearby',
    params: {location: `37.7749,-122.402325`, type: 'cafe', radius: '150', language: 'en'},
    headers: {
      'X-RapidAPI-Key': '49b3d82605msh88c216e62d3770cp13f60cjsnec91372acf2e',
      'X-RapidAPI-Host': 'trueway-places.p.rapidapi.com'
    }
  };
  
  
  axios.request(options).then(function (response) {
    console.log(response.data);
      const options = {
        method: 'GET',
        url: 'https://trueway-geocoding.p.rapidapi.com/Geocode',
        params: {address: 'toronto, ontario', language: 'en'},
        headers: {
          'X-RapidAPI-Key': '49b3d82605msh88c216e62d3770cp13f60cjsnec91372acf2e',
          'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
        }
      };
      axios.request(options).then(function (response) {
        console.log(response.data);
        lat = response.data.results.location.lat;
        lng = response.data.results.location.lng;
      }).catch(function (error) {
        console.error(error);
      });
    res.render("index", {places: response.data})
  }).catch(function (error) {
    console.error(error);
  });
}


  var lng;
  var lat;

  // function getGeo(res){
  //   const options = {
  //     method: 'GET',
  //     url: 'https://trueway-geocoding.p.rapidapi.com/Geocode',
  //     params: {address: 'toronto, ontario', language: 'en'},
  //     headers: {
  //       'X-RapidAPI-Key': '49b3d82605msh88c216e62d3770cp13f60cjsnec91372acf2e',
  //       'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
  //     }
  //   };
    
  //   axios.request(options).then(function (response) {
  //     console.log(response.data);
  //     lat = response.data.results.location.lat;
  //     lng = response.data.results.location.lng;
  //   }).catch(function (error) {
  //     console.error(error);
  //   });
  // }
