# node_test
Simple API using nodejs, express, and mongoDB with test suite built using mocha, supertest and expect


Endpoints
-------------------------------------------------------------
GET /api/car - 
Retrieve all calls

GET /api/car/:id -
Retrieve call with id

POST /api/car -
Add new car
Request body:
1. make: string, required
2. model: string, required
3. colour: string, required


Initial setup
------------------------------------------------------------
Create folder "config" 
Inside this folder create file config.js with the following lines:
module.exports = {
	MONGO_DB_URL: "your_db_connection_url"
};


Run tests
-------------------------------------------------------------
Tests can be run using the command npm test


Dockerise app
--------------------------------------------------------------
Dockerfile and .dotignore files are added to project. 
Docker image has been uploaded to docker hub with the name tonyjp/node_test
