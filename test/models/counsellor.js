const Counsellor = require('../../models').counsellor
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const server = require('../../app_test');
const setup = require('./setup');
const db = require('../../db');

chai.use(chaiHttp);


// Request server
const app = chai.request(server);

describe('COUNSELLOR TESTS', function() {

	// Function to create counsellor
	// - expDiff is expected difference in count after creation
	// - expStatus is expected status after sending post request
	function createCounsellor(cslr, expDiff, expStatus, done) {
		Counsellor.count(count => {
			app
			.post('/counsellors')
			.send(cslr)
			.end(function(err, res) {
				res.should.have.status(expStatus);
				Counsellor.count((newCount,err) => {
					expect(newCount).to.equal(count+expDiff);
					if (err) done(err);
					done();	
				});
			});	
		});
	};

	var firstName = 'counsellor';
	var lastName = 'two';
	var email = 'email@email.ca';
	var password =  'password2';



	var couns = {
		firstName: firstName,
		lastName: lastName,
		email: email,
		password: password
	}

	// Add two test users to DB
	before(function(done) {
		setup.setup(db,app,done);
	});

	// Destroy all counsellors in DB after tests
	after(function(done) {
		setup.resetDb(db,app,done);
	});


	// Ensure that two counsellors are in DB 
	describe("DB setup", function() {
		// There should be two counsellors
		it('should return two', function(done) {
			Counsellor.count((count,err) => {
				if (err) done(err);
				expect(count).to.equal(setup.counsellorCount);
				done()
			});
		});
	});

	// Test creating a user 
	describe("Counsellor Create", function() {
		// Test creating a user
		it('should create a counsellor', function(done) {
			createCounsellor(couns, 1, 201, done);
		});

		// Should not create counsellors if missing required fields
		it('should not create counsellor without first name', function(done) {
			couns.firstName = null;
			createCounsellor(couns, 0, 400, (err) => {
				if (err) done(err);
				couns.firstName = firstName;
				done();
			});
		});

		it('should not create counsellor without last name', function(done) {
			couns.lastName = null;
			createCounsellor(couns, 0, 400, (err) => {
				if (err) done(err);
				couns.lastName = lastName;
				done();
			});
		});

		it('should not create counsellor without email', function(done) {
			couns.email = null;
			createCounsellor(couns, 0, 400, (err) => {
				if (err) done(err);
				couns.email = email;
				done();
			});
		});

		it('should not create counsellor without password', function(done) {
			couns.password = null;
			createCounsellor(couns, 0, 400, (err) => {
				if (err) done(err);
				couns.password = password;
				done();
			});
		});
	});


	// Test getting counsellor index page 
	describe("Counsellor retrieval", function() {
		it('should get counsellor index', function(done) {
			app
			.get('/counsellors')
			.end(function(err, res) {
				res.should.have.status(200);				
				for (var key in couns) {
					expect(res.text).to.include(couns[key]);	
				}
				done();
			});
		});

		// Get a single counsellor
		it('should get a single counsellor', function(done) {
			app
			.get('/counsellors/'+1)
			.send({ counsellorId: 1 })
			.end(function(err, res) {
				res.should.have.status(200);				
				for (var key in setup.couns1) {
					expect(res.text).to.include(setup.couns1[key]);	
				}
				done();
			});
		});
	});

	// Test destroying counsellors
	describe("Destroy", function() {
		// destroy single counsellor
		it('should destroy counsellor', function(done) {
			Counsellor.count((count,err) => {
				if (err) done(err);
				app
				.del('/counsellors/'+3) 
				.send({ counsellorId: 3 }) // Delete the third counsellor
				.end(function(err, res) {
					res.should.have.status(204);
					Counsellor.count((newCount,err) => {
						if (err) done(err);
						expect(newCount).to.equal(count-1);
						done();
					});
				});	
			});
		});		
	});


	// Test Counsellor updates
	describe("Updates", function() {
		// Update counsellor2
		it('should update counsellor', function(done) {
			var newemail = 'newemail@email.com'
			app
			.put('/counsellors/'+2) 
			.send({ counsellorId: 2, email: newemail })
			.end(function(err, res) {
				res.should.have.status(200);
				// Ensure counsellor has updated values
				app
				.get('/counsellors/'+2)
				.end(function(err, res) {
					res.should.have.status(200);
					expect(res.text).to.include(newemail)
					done();
				});
			});
		});
		
	});
});
