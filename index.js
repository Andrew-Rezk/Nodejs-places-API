const express = require("express");
const path = require("path");
const axios = require("axios");
const qs = require("querystring"); 
const bodyParser = require('body-parser');

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || "8080";


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//set up static path (for use with CSS, client-side JS, and image files)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(bodyParser.json());
const urlencodedParser = app.use(bodyParser.urlencoded({ extended: true }));


//HTTP server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

// `await` can only be used in `async` functions
// `async` was added here
app.get("/", async (req, res) => {
 
  const inputLocation = 'toronto';
  const userInput = req.body;
  console.log(userInput);
  

 
  const { latitude, longitude } = await getCoordinates(inputLocation);

  // Get places from the coordinates
  const response = await getPlaces(latitude, longitude);

  // Render result here
  res.render("index", { places: response.data });
});

// Functions should only do one thing
// Rendering should not be in this function
// This way it is reusable anywhere in the code, or in other projects
async function getPlaces(latitude, longitude) {
  const options = {
    method: 'GET',
    url: 'https://trueway-places.p.rapidapi.com/FindPlacesNearby',
    params: { location: `${latitude},${longitude}`, type: 'park', radius: '150', language: 'en' },
    headers: {
      'X-RapidAPI-Key': '49b3d82605msh88c216e62d3770cp13f60cjsnec91372acf2e',
      'X-RapidAPI-Host': 'trueway-places.p.rapidapi.com'
    }
  };

  // Old way: Promises with `.then` and `.catch`
  // This sucks, please learn async/await
  return axios.request(options).then(response => {
    return response;
  }).catch(error => {
    console.error(error);
    return null;
  })
}

// `await` can only be used in `async` functions
async function getCoordinates(location) {
  const options = {
    method: 'GET',
    url: 'https://trueway-geocoding.p.rapidapi.com/Geocode',
    params: { address: location, language: 'en' },
    headers: {
      'X-RapidAPI-Key': '49b3d82605msh88c216e62d3770cp13f60cjsnec91372acf2e',
      'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
    }
  };

  try {
    // As you can see async/await is better
    const response = await axios.request(options);

    const latitude = response.data.results[0].location.lat;
    const longitude = response.data.results[0].location.lng;

    return { latitude, longitude };
  } catch (error) {
    console.error(error);
    return null;
  }
}

