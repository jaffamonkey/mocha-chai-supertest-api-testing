var express = require('express');
var carsController = require('../controllers/carsController');

// Setup express router
var router = express.Router();

// Add routes to router
// Get all cars
router.get('/car', carsController.index);

// Show particular car
router.get('/car/:id', carsController.show);

// Creat new car
router.post('/car', carsController.create);

// Add route to exports
module.exports = router;