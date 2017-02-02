'use strict';

var express = require('express');
var app = express();

app.use(function(req, res, next) {
	req.myMessage = "Hello from First";
	console.log('First Middleware');
	next();
});

app.use(function(req, res, next) {
	console.log('Second Middleware', req.myMessage);
	next();
});

app.use('/route', function(req, res, next) {
	console.log('route');
	next();
});

app.use('/route/:id', function(req, res, next) {
	console.log('Params', req.params.id);
	next();
});
var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log('Server running at port :', port);
});