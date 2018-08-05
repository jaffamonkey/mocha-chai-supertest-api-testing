var mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://admin:abcd123@ds213612.mlab.com:13612/node_test', {useNewUrlParser: true});