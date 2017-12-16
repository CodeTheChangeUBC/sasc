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

	var email = "email3@email3.com";
	var twilioPhoneNumber = '6040001111';
	var accountSid = '98889998898';
	var authToken = 'AUUTHTHSHZHZH';

	var twilio = {
		email: email,
		twilioPhoneNumber: twilioPhoneNumber,
		accountSid: accountSid,
		authToken: authToken
	}

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

	// Add Twilios
	describe('Create', () => {
		
		it('should create new twilio', function(done) {
			Twilio.create(twilio, () => {
				Twilio.count((count,err) => {
					expect(count).to.equal(setup.twilioCount+1);
					done();
				});					
			});
		});

	});

	describe('Retrieval', function() {

		it('should retrieve by values', function(done) {
			Twilio.retrieveByValues(twilio, (err,result) => {
				expect(result).to.be.an('array');
				expect(result[0]).to.include({'ID':setup.twilioCount+1});
				done();
			});
		})

		it('should retrieve by id', function(done) {
			Twilio.retrieveByID(setup.twilioCount+1, (err,twil) => {
				expect(twil).to.include({'ID': setup.twilioCount+1});
				done();
			})
		})
	});

	describe('Updating', function() {
		it('should change email of twilio', function(done) {
			var new_email = "new@email.ca";
			Twilio.update(setup.twilioCount+1, {'email': new_email}, function(err, twil) {
				if (err) done(err);
				Twilio.retrieveByID(setup.twilioCount+1, (err,twil) => {
					expect(String(twil.email)).to.equal(new_email);
					done();
				});
			});
		});
	});

	describe('Deleting', function() {
		it('should destroy session', function(done) {
			Twilio.count(count => {
				Twilio.destroy(setup.twilioCount+1, (err, res) => {
					if (err) done(err);
					Twilio.count(newCount => {
						expect(newCount).to.equal(count-1);
						done();
					});
				});
			});
		});

		it('should not destroy non existent session', function(done) {
			Twilio.count(count => {
				Twilio.destroy(setup.twilioCount+2, (err, res) => {
					if (err) done(err);
					Twilio.count(newCount => {
						expect(newCount).to.equal(count);
						done();
					});
				});
			});
		})
	});


	
});