'use strict';

var express = require('express');
var jsonParser = require('body-parser').json;

var app = express();

var jsonCheck = function(req, res, next) {
	if(req.body) {
		console.log('req.body is found');
	} else {
		console.log('req.body is not found');
	}
	next();
}

app.use(jsonCheck);
app.use(jsonParser());
app.use(jsonCheck);

var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log('Server running at port :', port);
});