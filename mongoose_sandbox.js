'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sandbox');

var db = mongoose.connection;

db.on('error', function(err) {
	console.error('Error occured', err);
});

db.once('open', function() {
	console.log('db connection succesful');

	// Create Schema
	var AnimalSchema = mongoose.Schema({
		name: {
			type: String, 
			default: "Tiger"
		},
		isClever: String
	});

	// Mongoose static methods
	AnimalSchema.statics.findClever = function(callback) {
		return this.find({isClever: "yes"}, callback);
	};

	// Mongoose middleware hook
	AnimalSchema.pre('save', function(next) {
		if (this.name === 'Fox') {
			this.isClever = "yes";
		}
		next();
	});

	// Create Model
	var Animal = mongoose.model("Animal", AnimalSchema);

	// Create Document
	var lion = new Animal({name: "Lion"});
	var tiger = new Animal({});
	var elephant = new  Animal({name: "Elephant"});

	var animalData = [
		lion,
		tiger,
		elephant,
		{
			name: "Giraff"
		},
		{
			name: "Fox"
		},
		{
			name: "Hippo"
		}
	];

	//Remove documents
	Animal.remove({}, function(err) {
		if (err) console.error("Save Failed", err);
		
		Animal.create(animalData, function(err) {
			if (err) console.error("Save Failed", err);
			//Query Animal
			Animal.findClever(function(err, animals) {
				animals.forEach(function(animal) {
					console.log(animal.name);
				});
				db.close(function() {
					console.log("Connection is closed");
				});
			}); // Animal.find
		}); //Animal.create
	}); // Animal.remove

});