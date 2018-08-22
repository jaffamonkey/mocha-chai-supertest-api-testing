_Simple API using nodejs, express, and mongoDB with test suite built using mocha, supertest and expect_

## Steps

### Start Mongo server
```
$ mongod
```

### Access Mongo console and create db for test
```
$ mongo
> use apitestdb
```

### Add config file

Create folder "config" 
Inside this folder create file config.js with the following lines:
```
module.exports = {
	MONGO_DB_URL: "mongodb://localhost:27017/apitestdb"
};
```
 
### Run tests
```
$ npm test
```

### The Endpoints

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