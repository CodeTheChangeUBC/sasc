const userController = require('../../server/controllers').users;
const User = require('../../server/models').User
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const server = require('../../app')

chai.use(chaiHttp);

describe("User Tests", function() {

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
		it('should create another user', function(done) {
			var user = {
				age: 20,
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
	});
});