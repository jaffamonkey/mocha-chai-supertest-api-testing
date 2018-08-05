var express = require('express');

// Setup express router
var router = express.Router();

// Add routes to router
// Test route to ensure things are working - GET /
router.get('/', function (req, res) {
	res.send("Hello World!!! " + req.query.greeting);
});

// Add route to exports
module.exports = router;