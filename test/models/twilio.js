const Twilio = require('../../models').twilio;
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const server = require('../../app_test');
const db = require('../../db');
const setup = require('./setup');

chai.use(chaiHttp);

// Request server
const app = chai.request(server);

describe('SESSION TESTS', function() {

	before(function(done) {
		setup.setup(db,app,done);
	});

	after(function(done) {
		setup.resetDb(db,app,done);
	});

	// Ensure test setup was correct
	describe('Setup', function() {
		it ('should be 2', function(done) {
			Twilio.count((count,err) => {
				if (err) done(err);
				expect(count).to.equal(setup.sessionCount);
				done();
			});
		});		
	});	

	
});