var mongoose = require('mongoose');
var config = require('../config/config');

//var dbUrl = config.MONGO_DB_URL || '';

module.exports = mongoose.connect(config.MONGO_DB_URL, {useNewUrlParser: true});