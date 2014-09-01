var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var api = require('./routes/api');

var app = express();

// Parse JSON
app.use(bodyParser());
// Cookies
app.use(cookieParser());
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: 'salaisuus',
	cookie: {
		maxAge: 3600000
	}
}));
// Use '/api' as the base route for the API
app.use('/node/api', api);

mongoose.connect('mongodb://127.0.0.1:27017/backbonedb');

var db = mongoose.connection;

db.on('error', function(err) {
	console.log('Couldnt connect to the server');
});
db.once('open', function() {
	console.log('Connection created successfully');
});

/* Server */
var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('Express server listening on port ' + port);
});