'use strict';

var express = require('express');
var jsonParser = require('body-parser').json;
var logger = require('morgan');
var routes = require('./routes');

var app = express();

app.use(logger('dev'));
app.use(jsonParser());
app.use('/questions', routes);

var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log('Server running at port :', port);
});