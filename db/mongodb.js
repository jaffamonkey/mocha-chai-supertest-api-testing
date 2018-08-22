var mongoose = require('mongoose');
var config = require('../config/config.js');

//var dbUrl = config.MONGO_DB_URL || '';

module.exports = mongoose.connect(config.MONGO_DB_URL, {useNewUrlParser: true});