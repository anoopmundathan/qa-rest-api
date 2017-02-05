'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var sortAnswers = function(a, b) {
	// -1 negative a before b
	// 0 no change
	// + positve a after b

	if (a.votes === b.votes) {
		return b.updateAt - a.updateAt;
	}

	return b.votes - a.votes;
};

var AnswerSchema = new Schema({
	text: String,
	createdAt: {
		type: Date,
		default: Date.now
	},
	updateAt: {
		type: Date,
		default: Date.now
	},
	votes: {
		type: Number,
		default: 0
	}
});

var QuestionSchema = new Schema({
	text: String,
	createdAt: {
		type: Date,
		default: Date.now
	},
	answers: [AnswerSchema]
});

QuestionSchema.pre('save', function(next) {
	this.answers.sort(sortAnswers);
	next();
});

var Question = mongoose.model('Question', QuestionSchema);
module.exports.Question = Question;


