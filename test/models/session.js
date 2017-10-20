const Session = require('../../models').session;
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

	// Function to create session
	// - expDiff is expected difference in count after creation
	// - expStatus is expected status after sending post request
	function createSession(session, expDiff, done) {
		Session.count(count => {
			Session.create(session,(err,model) => {
				Session.count(newCount => {
					expect(newCount).to.equal(count+expDiff);
					if (err) done(err);
					else done();
				});					
			});
		});
	};

	var beginTime = "2017-01-01 00:00:03";
	var endTime = "2018-09-03 00:00:00";
	var userID = 2;
	var counsellorID = 2;

	var session = {
		beginTime: beginTime,
		endTime: endTime,
		userID: userID,
		counsellorID: counsellorID
	}

	before(function(done) {
		setup.setup(db,app,done);
	});

	after(function(done) {
		setup.resetDb(db,app,done);
	})

	// Ensure test setup was correct
	describe('Setup', function() {
		it ('should be 2', function(done) {
			Session.count((count,err) => {
				if (err) done(err);
				expect(count).to.equal(setup.sessionCount);
				done();
			});
		});		
	});	


	describe('Create Session', function() {

		it('should create new session', function(done) {
			Session.create(session, () => {
				Session.count((count,err) => {
					expect(count).to.equal(setup.sessionCount+1);
					done();
				});					
			});
		});

		// Ensure it doesn't create session when missing required params
		it('should not create session without counsellor ID', function(done) {
			session.counsellorID = null;
			createSession(session, 0, () => {
				session.counsellorID = counsellorID;
				done();
			});
		});
	});

	describe('Retrieval', function() {
		it('should retrieve single session by counsellor', function(done) {
			Session.listByCounsellor(1, (err,list) => {
				if (err) done(err);
				expect(list.length).to.equal(1);
				expect(list).to.be.an('array');
				expect(list[0]).to.include({'counsellorID':1})
				done();
			});
		});

		it('should retrive single session by user', function(done) {
			Session.listByUser(2, (err,list) => {
				if (err) done(err);
				expect(list.length).to.equal(2);
				expect(list).to.be.an('array');
				expect(list[0]).to.include({'userID':2})
				expect(list[1]).to.include({'userID':2})
				done();
			});
		})

		it('should retrieve by values', function(done) {
			Session.retrieveByValues(session, (err,result) => {
				expect(result).to.be.an('array');
				expect(result[0]).to.include({'ID':setup.sessionCount+1});
				done();
			});
		})

		it('should retrieve by id', function(done) {
			Session.retrieveByID(setup.sessionCount+1, (err,sesh) => {
				expect(sesh).to.include({'ID': setup.sessionCount+1});
				expect(sesh).to.include({'counsellorID': 2});
				expect(sesh).to.include({'userID': 2});
				done();
			})
		})
	});

	describe('Updating', function() {
		it('should change endTime of session', function(done) {
			var et = "2015-01-03 10:10:10"
			var et_string = 'Sat Jan 03 2015 10:10:10 GMT-0800 (PST)' // how times are stored
			Session.update(setup.sessionCount+1, {'endTime': et}, function(err, sesh) {
				if (err) done(err);
				Session.retrieveByID(setup.sessionCount+1, (err,sesh) => {
					expect(String(sesh.endTime)).to.equal(et_string);
					done();
				});
			});
		});
	});

	describe('Deleting', function() {
		it('should destroy session', function(done) {
			Session.count(count => {
				Session.destroy(setup.sessionCount+1, (err, res) => {
					if (err) done(err);
					Session.count(newCount => {
						expect(newCount).to.equal(count-1);
						done();
					});
				});
			});
		});

		it('should not destroy not existent session', function(done) {
			Session.count(count => {
				Session.destroy(setup.sessionCount+2, (err, res) => {
					if (err) done(err);
					Session.count(newCount => {
						expect(newCount).to.equal(count);
						done();
					});
				});
			});
		})
	});
});
