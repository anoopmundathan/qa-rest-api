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
		}
	});

	// Create Model
	var Animal = mongoose.model("Animal", AnimalSchema);

	// Create Document
	var lion = new Animal({name: "Lion"});
	var tiger = new Animal({});
	var elephant = new  Animal({name: "Elephant"});

	//Remove documents
	Animal.remove({}, function(err) {
		if (err) console.error("Save Failed", err);
		// Save Lion
		lion.save(function(err) {
			if (err) console.error("Save Failed", err);
			// Save Tiger
			tiger.save(function(err) {
				if (err) console.error("Save Failed", err);
				//Save Elephant
				elephant.save(function(err) {
					if (err) console.error("Save Failed", err);
					//Query Animal
					Animal.find(function(err, animals) {
						animals.forEach(function(animal) {
							console.log(animal.name);
						});
						db.close(function() {
							console.log("Connection is closed");
						});
					}); // Animal.find
				}); // elephant.save
			}); // tiger.save
		}); // lion.save
	}); // Animal.remove
});