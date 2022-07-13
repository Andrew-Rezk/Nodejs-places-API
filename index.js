const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {Client} = require("@googlemaps/google-maps-services-js");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

const client = new Client({});



app.get('/', function (req, res) {
  res.render('index');
})

app.post('/', function (req, res) {
    res.render('index');
  })

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
