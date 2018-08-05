var mongoose = require('mongoose');

// Define schema
var CarSchema = new mongoose.Schema({
	make: {
		type: String,
		required: true	
	},
	model: {
		type: String,
		required: true	
	},
	colour: {
		type: String,
		required: true	
	}
});

// Return model from schema
module.exports = mongoose.model('Cars', CarSchema);