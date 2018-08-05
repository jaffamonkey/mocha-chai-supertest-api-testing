# node_test
Simple API using nodejs, express, and mongoDB with test suite built using mocha, supertest and expect


Endpoints
-------------------------------------------------------------
/api/car - GET
Retrieve all calls

/api/car/:id - GET
Retrieve call with id

/api/car - POST
Add new car
Request body:
make: string, required
model: string, required
colour: string, required


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
