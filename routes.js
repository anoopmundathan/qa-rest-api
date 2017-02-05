'use strict';

var express = require('express');
var Question = require('./models').Question;
var router = express.Router();


router.param("qID", function(req, res, next, id) {
	Question.findById(id, function(err, question) {
		if(err) return next(err);
		if(!question) {
			err = new Error('Not Found');
			err.status = 404;
			next(err);
		}
		req.question = question;
		next();
	});
});

router.param("aID", function(req, res, next, id) {
	req.answer = req.question.answers.id(id);
	if(!req.answer) {
			err = new Error('Not Found');
			err.status = 404;
			next(err);
	}
	next();
});

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
router.get('/:qID', function(req, res) {
	res.json(req.question);
});


// POST /questions/:id/answers
// Route for creating an answer
router.post('/:qID/answers', function(req, res) {
	req.question.answers.push(req.body);
	req.question.save(function(err, question) {
		if(err) return next(err);
		res.status(201);
		res.json(question);
	});
});


// PUT /questions/:qId/answers/:aId
// Edit an answer
router.put('/:qID/answers/:aID', function(req, res) {
	// Instance method
	req.answer.update(req.body, function(err, result) {
		if(err) return next(err);
		res.json(result);
	});
});

// DELETE /questions/:qId/answers/:aId
// DELETE an answer
router.delete('/:qID/answers/:aID', function(req, res) {
	req.answer.remove(function(err) {
		req.question.save(function(err, question) {
			if(err) return next(err);
			res.json(question);
		});
	});
});

// POST /questions/:qId/answers/:aId/voute-up
// POST /questions/:qId/answers/:aId/voute-down
// Vote specific answer
router.post('/:qID/answers/:aID/vote-:dir', 

	function(req, res, next) {
		if(req.params.dir.search(/^(up|down)$/) === -1) {
			var err = new Error("Not Found Vote");
			err.status = 404;
			next(err);
		} else {
			req.vote = req.params.dir;
			next();
		}
	}, 

	function(req, res, next) {

	req.answer.vote(req.vote, function(err, question) {
		if(err) return next(err);
		res.json(question);
	});
});


module.exports = router;