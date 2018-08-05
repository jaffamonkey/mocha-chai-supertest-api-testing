var Car = require('../models/car');

// Show all cars
module.exports.index = function (req, res) {
	Car.find(function (err, docs) {
		if (err) {
			res.json({message: "Could not get docs", error: err});
		} else {
			res.json({cars: docs});
		}
	});
};

// Show particular car
module.exports.show = function (req, res) {
	Car.findById(req.params.id, function (err, doc) {
		if (err) {
			res.json({message: "Could not find doc", error: err});
		} else {
			res.json({car: doc});
		}
	});
};

// Create new car
module.exports.create = function (req, res) {
	var car = new Car();
	car.make = req.body.make;
	car.model = req.body.model;
	car.colour = req.body.colour;
	car.save(function (err, savedDoc) {
		if (err) {
			res.json({message: "Could not save car", error: err});
		} else {
			res.json({message: "Document saved", savedDoc: savedDoc});
		}
	});
};