const User = require('../../models').user
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const server = require('../../app_test');

chai.use(chaiHttp);


// Request server
const app = chai.request(server);


describe("USERS", function() {

	var user1 = {
		age: 30,
		gender: 'female',
		phoneNumber: '(604) 111-1111',
		password: 'user1pass'
	}

	var user2 = {
		age: 25,
		gender: 'other',
		phoneNumber: '6049999999',
		password: 'user2pass'
	}

	var user = {
		age: 25,
		gender: 'male',
		phoneNumber: '7779999999',
		password: 'password',
	}

	// Add two test users to DB
	before(function(done) {
		app
		.post('/users')
		.send(user1)
		.end(function(err, res) {
			app
			.post('/users')
			.send(user2)
			.end(function(err, res) {
				done()
			});
		});
	});

	// Destroy all users in DB after tests
	after(function(done) {
		User.destroyAll().then(() => done());
	});


	// Ensure that two users are in DB 
	describe("DB should be clean", function() {
		// There should be no users in DB
		it('should return zero', function(done) {
			User.count().then(count => {
				expect(count).to.equal(2);
				done()
			});
		});
	});

	// Test creating a user 
	describe("User Create", function() {
		// Test creating a user
		it('should create a user', function(done) {
			User.count().then(function(count) {
				app
				.post('/users')
				.send(user)
				.end(function(err, res) {
					res.should.have.status(201);
					User.count().then(newCount => {
						expect(newCount).to.equal(count+1);
						done();	
					}).catch(error => done(error));
				});
			}).catch(error => done(error));
		});
	});


	// Test getting user page 
	describe("User retrieval", function() {
		it('should get user index', function(done) {
			app
			.get('/users')
			.end(function(err, res) {
				res.should.have.status(200);				
				for (var key in user) {
					expect(res.text).to.include(user[key]);	
				}
				done();
			});
		});

		// Get a single user
		it('should get a single user', function(done) {
			app
			.get('/users/'+1)
			.send({ userId: 1 })
			.end(function(err, res) {
				res.should.have.status(200);				
				for (var key in user) {
					expect(res.text).to.include(user1[key]);	
				}
				done();
			});
		});
	});

	// Test destroying users
	describe("User destroy", function() {
		// Test destroying a user
		it('should destroy user', function(done) {
			User.count().then(count => {
				app
				.del('/users/'+1) 
				.send({ userId: 1 }) // Delete the first user
				.end(function(err, res) {
					res.should.have.status(204);
					User.count().then(function(newCount) {
						expect(newCount).to.equal(count-1);
						done();
					}).catch(error => done(error));
				});	
			}).catch(error => done(error));
		});		
	});


	// Test User updates
	describe("User Updates", function() {
		// Update user 1
		it('should update user', function(done) {
			app
			.put('/users/'+2) 
			.send({ userId: 2, age: 29 })
			.end(function(err, res) {
				res.should.have.status(200);
				// Ensure user has updated values
				app
				.get('/users/'+2)
				.end(function(err, res) {
					res.should.have.status(200);
					expect(res.text).to.include(29)
					done();
				});
			});
		});
		
	});
});
