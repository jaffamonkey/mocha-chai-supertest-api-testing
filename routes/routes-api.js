var express = require('express');

// Setup express router
var router = express.Router();

// Add routes to router
// Test route to ensure things are working - GET /
router.get('/', function (req, res) {
	res.json({message: "Hello World from API!!!"});
});

// Test POST route
router.post('/testPost', function (req, res) {
	res.json({message: {data: req.body.data}});
});

// Add route to exports
module.exports = router;