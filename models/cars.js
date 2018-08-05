var mongoose = require('mongoose');

// Define schema
var CarSchema = new mongoose.Schema({
	make: String,
	model: String,
	colour: String
});

// Return model from schema
module.exports = mongoose.model('Cars', CarSchema);