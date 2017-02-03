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
		isClever: String,
		color: String
	});

	// Mongoose static methods
	AnimalSchema.statics.findClever = function(callback) {
		return this.find({isClever: "yes"}, callback);
	};

	// Mongoose instance methods
	AnimalSchema.methods.findColor = function(callback) {
		return this.model("Animal").find({color: this.color}, callback);
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
	var lion = new Animal({
		name: "Lion",
		color: "Grey"
	});
	var tiger = new Animal({});
	var elephant = new  Animal({
		name: "Elephant",
		color: "Black"
	});

	var animalData = [
		lion,
		tiger,
		elephant,
		{
			name: "Giraff",
			color: "Grey"
		},
		{
			name: "Fox",
			color: "Orange"
		},
		{
			name: "Hippo",
			color: "Grey"
		}
	];

	//Remove documents
	Animal.remove({}, function(err) {
		if (err) console.error("Save Failed", err);
		
		Animal.create(animalData, function(err) {
			if (err) console.error("Save Failed", err);
			//Query Animal

			Animal.findOne({name: "Lion"}, function(err, animal) {
				if(err) console.error("Error occured", err);
				animal.findColor(function(err, animals) {
					
					animals.forEach(function(animal) {
						console.log(animal.name);
					});
					
					db.close(function() {
						console.log("Connection is closed");
					});
				});
			});
		}); //Animal.create
	}); // Animal.remove

});