// Base setup
// Require system and 3rd party packages
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Initialise app
var app = express();

// Require application modules
var dbConn = require('./db/mongodb.js'); // Connect to Mongo DB

// Configure app to use	body-parser with json
app.use(bodyParser.json());
// Configure app to use body-parser with urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// Setup application routes
//var routesWeb = require('./routes/routesWeb');
var routesApi = require('./routes/routesApi');

// Register router with app
app.use('/api', routesApi);
//app.use('/', routesWeb);


// Get PORT env var or set to default 3000
var port = process.env.PORT || 3000;

// Start server to listen to PORT
app.listen(port, function () {
	console.log("Server started and listening on " + port);
});

// For unit testing
module.exports = app;
