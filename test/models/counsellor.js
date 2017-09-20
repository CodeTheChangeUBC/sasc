const Counsellor = require('../../models').counsellor
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const server = require('../../app_test');

chai.use(chaiHttp);


// Request server
const app = chai.request(server);

describe('COUNSELLOR TESTS', function() {

	var couns1 = {
		firstName: 'counsellor',
		lastName: 'one',
		email: 'email@email.ca',
		password: 'password'
	}

	var couns2 = {
		firstName: 'counsellor',
		lastName: 'two',
		email: 'email@email.ca',
		password: 'password2'
	}

	var couns = {
		firstName: 'counsellor',
		lastName: 'two',
		email: 'email@email.ca',
		password: 'password2'
	}

	// Add two test users to DB
	before(function(done) {
		app
		.post('/counsellors')
		.send(couns1)
		.end(function(err, res) {
			app
			.post('/counsellors')
			.send(couns2)
			.end(function(err, res) {
				done()
			});
		});
	});

	// Destroy all counsellors in DB after tests
	after(function(done) {
		Counsellor.destroyAll((err) => {
			if (err) done(err);
			done();
		})
	});


	// Ensure that two counsellors are in DB 
	describe("DB setup", function() {
		// There should be two counsellors
		it('should return two', function(done) {
			Counsellor.count((count,err) => {
				if (err) done(err);
				expect(count).to.equal(2);
				done()
			});
		});
	});

	// Test creating a user 
	describe("Counsellor Create", function() {
		// Test creating a user
		it('should create a counsellor', function(done) {
			Counsellor.count(count => {
				app
				.post('/counsellors')
				.send(couns)
				.end(function(err, res) {
					res.should.have.status(201);
					Counsellor.count((newCount,err) => {
						if (err) done(err);
						expect(newCount).to.equal(count+1);
						done();	
					});
				});
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
				for (var key in couns1) {
					expect(res.text).to.include(couns1[key]);	
				}
				done();
			});
		});
	});

	// Test destroying counsellors
	describe("User destroy", function() {
		// destroy single counsellor
		it('should destroy counsellor', function(done) {
			Counsellor.count((count,err) => {
				if (err) done(err);
				app
				.del('/counsellors/'+1) 
				.send({ counsellorId: 1 }) // Delete the first counsellor
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
	describe("Counsellor Updates", function() {
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
