'use strict';

var express = require('express');

var router = express.Router();

//GET /questions
router.get('/', function(req, res, next) {
	res.json({
		response: "GET request"
	});
});

//POST /questions
router.post('/', function(req, res, next) {
	res.json({
		response: "POST request",
		body: req.body
	});
});

//GET /questions/:id
//Route for specific question
router.get('/:id', function(req, res) {
	res.json({
		response: "GET request for" + req.params.id
	});
});

module.exports = router;