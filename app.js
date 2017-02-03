'use strict';

var express = require('express');
var jsonParser = require('body-parser').json;
var logger = require('morgan');
var routes = require('./routes');

var app = express();

app.use(logger('dev'));
app.use(jsonParser());
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