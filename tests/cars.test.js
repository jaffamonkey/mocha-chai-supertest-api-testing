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
				expect(Array.isArray(res.body)).toBe(true);
				expect(res.body.length).toBe(0);
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
				expect(res.body).toBeNull();
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
				expect(res.body[0]).toHaveProperty("make");
				expect(res.body[0].make).toBe("test");
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
				expect(res.body).toHaveProperty('error');
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
				expect(res.body).toHaveProperty('error');
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
				expect(res.body).toHaveProperty('error');
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
				expect(res.body).not.toHaveProperty('error');
				expect(res.body).toHaveProperty('savedDoc');

			})
			.end(function (err, res) {
				if (err) return done(err);
				Car.find(function (err, docs) {
					if (err) return done(err);
					expect(docs.length).toBe(1);
					expect(docs[0]).toHaveProperty("make");
					expect(docs[0].make).toBe("test make");
					done();
				});
			});
	});
});	