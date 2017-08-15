const userController = require('../../server/controllers').users;
const User = require('../../server/models').User
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const server = require('../../app')

chai.use(chaiHttp);

describe("USERS", function() {

	// Request server
	const app = chai.request(server)

	// Create seed users for testing 
	before(function(done) {
		this.timeout(10000);
		// Destroy all users - clean test db
		User.destroy({
			where: {}
		})
		// Create new users
		.then(function() {
			var user1 = {
				age: 20,
				gender: 'female',
				number: 604,
				password: 'password'
			}
			var user2 = {
				age: 30,
				gender: 'male',
				number: 5403,
				password: 'password',
			}
			app
			.post('/users')
			.send(user1)
			.end(function() {
				app.post('/users').send(user2)
				.end(function() {
					done();
				});
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
	})

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
			User.count().then(function(c1) {
				app
				.post('/users')
				.send(user)
				.end(function(err, res) {
					res.should.have.status(201);
					User.count().then(function(c) {
						expect(c).to.equal(c1+1)
					});
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