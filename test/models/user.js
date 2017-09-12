const User = require('../../models').user
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const server = require('../../app');

chai.use(chaiHttp);


// Request server
const app = chai.request(server);


describe("USERS", function() {

	// Test creating a user 
	describe("User Create and destroy", function() {
		// Test creating a user
		it('should create another user', function(done) {
			var user = {
				age: 25,
				gender: 'male',
				number: 40334,
				password: 'password',
			}
			var count = User.count();
			app
			.post('/users')
			.send(user)
			.end(function(err, res) {
				res.should.have.status(201);
				var newCount = User.count();
				expect(newCount).to.equal(count+1);
				done();
			});
		});
	});


	// Test getting user page 
	describe("User index", function() {
		it('should get user index', function(done) {
			app
			.get('/users')
			.end(function(err, res) {
				res.should.have.status(200);
				User.count().then(function(count) {
					// Ensure there are two users in db
					expect(count).to.equal(2);
					done();
				});
			});
		});

		// Test destroying a user
		it('should destroy user', function(done) {
			const user = User.findOne({ where: { age: 25 }})
			.then(function(user) {
				app
				.del('/users/'+user.id)
				.end(function(err, res) {
					res.should.have.status(204);
					User.count().then(function(count) {
						expect(count).to.equal(2);
						done();
					});
				});
			});
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
				.put('/users/'+user.id)
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

		

