'use strict';

var express = require('express');
var Question = require('./models').Question;
var router = express.Router();

//GET /questions
router.get('/', function(req, res, next) {
	Question.find({})
		.sort({createAt: -1})
		.exec(function(err, questions) {
			if(err) return next(err);
			res.json(questions);
		});
});

//POST /questions
router.post('/', function(req, res) {
	
	var question = new Question(req.body);
	question.save(function(err, question) {
		if(err) return next(err);
		res.status(201);
		res.json(question);
	});
});

// GET /questions/:id
// Route for specific question
router.get('/:qID', function(req, res, err) {
	Question.findById(req.params.qID, function(err, question) {
		if(err) return next(err);
		res.json(question);
	});
});


// POST /questions/:id/answers
// Route for creating an answer
router.post('/:qID/answers', function(req, res) {
	res.json({
		response: "POST request for /answers",
		questionId: req.params.qID,
		body: req.body
	});
});


// PUT /questions/:qId/answers/:aId
// Edit an answer
router.put('/:qID/answers/:aID', function(req, res) {
	res.json({
		response: "PUT request for questions/qID/answers/aID",
		questionId: req.params.qID,
		answerId: req.params.aID,
		body: req.body
	});
});

// DELETE /questions/:qId/answers/:aId
// DELETE an answer
router.delete('/:qID/answers/:aID', function(req, res) {
	res.json({
		response: "DELETE request for /questions/qID/answers/aID",
		questionId: req.params.qID,
		answerId: req.params.aID
	});
});

// POST /questions/:qId/answers/:aId/voute-up
// POST /questions/:qId/answers/:aId/voute-down
// Vote specific answer
router.post('/:qID/answers/:aID/vote-:dir', function(req, res, next) {
		if(req.params.dir.search(/^(up|down)$/) === -1) {
			var err = new Error("Not Found Vote");
			err.status = 404;
			next(err);
		} else {
			next();
		}
	}, function(req, res) {

	res.json({
		response: "POST request for /questions/qID/answers/aID/vote " + req.params.dir,
		questionId: req.params.qID,
		answerId: req.params.aID,
		vote: req.params.dir
	});
});


module.exports = router;