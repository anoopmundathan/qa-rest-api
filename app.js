'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var routes = require('./routes');
var mongoose = require('mongoose');

var app = express();

/* Serve static content using express middleware*/
app.use(express.static(__dirname + '/public'));

app.use(logger('dev'));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json 
app.use(bodyParser.json());


mongoose.connect("mongodb://localhost:27017/qa");
var db = mongoose.connection;

db.on('error', function(err) {
	console.log('Mongoose error', err);
});

db.once('open', function() {
	console.log('Mongoose connection opened');
});

app.use('/questions', routes);

// Send 404 if route is not found
app.use(function(req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// Error Handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log('Server running at port :', port);
});