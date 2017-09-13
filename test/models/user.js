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

	// Remove all users from Database 
	before(function(done) {
		User.destroyAll().then(() => done());
	});

	var user = {
		age: 25,
		gender: 'male',
		phoneNumber: '7779999999',
		password: 'password',
	}

	describe("DB should be clean", function() {
		// There should be no users in DB
		it('should return zero', function(done) {
			User.count().then(count => {
				expect(count).to.equal(0);
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
				done()
			});
		});

		// Get a single user
		it('should get a single user', function(done) {
			done();
		});
	});

	// Test destroying users
	describe("User destroy", function() {
		// Test destroying a user
		it('should destroy user', function(done) {
			User.count().then(count => {
				app
				.del('/users/'+1) // Delete the first user
				.send({ userId: 1 })
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
			//User.create({ age: 19, gender: 'm', number: 343, password: 'pass' })
			// .then
			User.findOne({ where: { age: 20 }})
			.then(user => {
				app
				.put('/users/'+1) 
				.send({ age: 29 })
				.end(function(err, res) {
					res.should.have.status(200);
					res.body.should.be.a('object');
					expect(res.body.user.age).to.equal(29);
					done();
				});
			});
		});
		
	});

	// User retrieval test
	describe("User Retrieval", function() {
		it('should retrieve user', function(done) {
			User.findOne({ where: { age: 30 }})
			.then(function(user) {
				app
				.get('/users/'+user.id)
				.end(function(err, res) {
					res.should.have.status(200);
					expect(res.body.user.id).to.equal(user.id);
					res.body.should.be.a('object');
					done();
				});
			});
		});
	});

});

		

