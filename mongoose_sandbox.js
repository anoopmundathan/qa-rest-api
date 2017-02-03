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
			default: "Rat"
		}
	});

	// Create Model
	var Animal = mongoose.model("Animal", AnimalSchema);

	// Create Document
	var lion = new Animal({name: "Anoop"});
	var animal = new Animal({});
	var whale = new Animal({
		name: "whale"
	});

	//Remove documents
	Animal.remove({}, function(err) {
		if (err) console.error("Save Failed", err);
		lion.save(function(err) {
			if (err) console.error("Save Failed", err);
			animal.save(function(err) {
				if (err) console.error("Save Failed", err);
				whale.save(function(err) {
					if (err) console.error("Save Failed", err);
					Animal.findAll(function(err, animals) {
						console.log(animals);
					});
					db.close(function() {
						console.log("Connection is closed");
					});	
				});
			});
		});
	});

	
});