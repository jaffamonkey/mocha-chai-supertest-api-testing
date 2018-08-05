// Require 3rd party libraries
var expect = require('expect');
var request = require('supertest');

// Invoke app
var app = require('../index');
// Invoke car model
var Car = require('../models/car');

// Clear car collection
beforeEach(function (done) {
	Car.remove({}, function (err) {
		done();
	});
});

describe('GET /car', function () {
	it('Should return all cars', function (done) {
		request(app)
			.get('/api/car')
			.expect(200)
			.expect('Content-Type', /json/)
			.expect(function (res) {
				expect(Array.isArray(res.body)).toBe(true); // Response body should be array
				expect(res.body.length).toBe(0); // Array should be empty
			})
			.end(function (err, res) {
				if (err) return done(err);					
				done();
			});
	});
});

describe('GET /car/:id', function () {
	it('Should return null when querying car id not present in collection', function (done) {
		request(app)
			.get('/api/car/10')
			.expect(400)
			.expect('Content-Type', /json/)
			.expect(function (res) {
				expect(res.body).toBeNull(); // Null response to be received
			})
			.end(function (err, res) {
				if (err) return done(err);					
				done();
			});
	});

	it('Should return car object as json when querying car id present in collection', function (done) {
		// Save a car to the collection
		var car = new Car();
		car.make = "test";
		car.model = "test";
		car.colour = "test";
		var returnedId = "";
		car.save(function (err, res) {
			if (err) return done("Could not add data to test this case");
			returnedId = res._id;
		});

		request(app)
			.get('/api/car/'+returnedId)
			.expect(200)
			.expect('Content-Type', /json/)
			.expect(function (res) {
				expect(typeof res.body).toBe('object');
				expect(res.body[0]).toHaveProperty("make"); // Checking for one of the properties added before
				expect(res.body[0].make).toBe("test"); // Checking for the exact value of the property
			})
			.end(function (err, res) {
				if (err) return done(err);					
				done();
			});
	});
});

describe('POST /car', function () {
	it('Should not create doc without make field', function (done) {
		var car = {
			make: "",
			model: "test",
			colour: "test"
		};
		request(app)
			.post('/api/car')
			.send(car)
			.expect(400)
			.expect('Content-Type', /json/)
			.expect(function (res) {
				expect(res.body).toHaveProperty('error'); // Checking for error property to indicate write failed
			})
			.end(function (err, res) {
				if (err) return done(err);
				done();
			});
	});

	it('Should not create doc without model field', function (done) {
		var car = {
			make: "test",
			colour: "test"
		};
		request(app)
			.post('/api/car')
			.send(car)
			.expect(400)
			.expect('Content-Type', /json/)
			.expect(function (res) {
				expect(res.body).toHaveProperty('error'); // Checking for error property to indicate write failed
			})
			.end(function (err, res) {
				if (err) return done(err);
				done();
			});
	});

	it('Should not create doc without colour field', function (done) {
		var car = {
			make: "test",
			model: "test",
			colour: ""
		};
		request(app)
			.post('/api/car')
			.send(car)
			.expect(400)
			.expect('Content-Type', /json/)
			.expect(function (res) {
				expect(res.body).toHaveProperty('error'); // Checking for error property to indicate write failed
			})
			.end(function (err, res) {
				if (err) return done(err);
				done();
			});
	});

	it('Should create doc when all fields are passed', function (done) {
		var car = {
			make: "test make",
			model: "test model",
			colour: "test colour"
		};
		request(app)
			.post('/api/car')
			.send(car)
			.expect(200)
			.expect('Content-Type', /json/)
			.expect(function (res) {
				expect(res.body).not.toHaveProperty('error'); // Checking there is no error property to indicate write success
				expect(res.body).toHaveProperty('savedDoc'); // Checking if the savedDoc is returned

			})
			.end(function (err, res) {
				if (err) return done(err);
				// Reading the DB to verify write succeeded
				Car.find(function (err, docs) {
					if (err) return done(err);
					expect(docs.length).toBe(1);
					expect(docs[0]).toHaveProperty("make"); // Checking for one of the properties added before 
					expect(docs[0].make).toBe("test make"); // Checking for the exact value of the property
					done();
				});
			});
	});
});	