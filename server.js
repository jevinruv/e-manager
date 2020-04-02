const express = require('express');
const path = require('path');
const app = express();
const request = require('request');

// Serve static files....
app.use(express.static(__dirname + '/dist/e-manager'));

// app.get("/api/*", (req, res) => {

//   const url = 'https://e-manager-api.herokuapp.com/api';
//   request(url).pipe(res);
// });

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/e-manager/index.html'));
});

// default Heroku PORT
app.listen(process.env.PORT || 3000);
