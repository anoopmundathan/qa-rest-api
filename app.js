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

var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log('Server running at port :', port);
});