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

	var session = {
		beginTime: "2017-01-01 00:00:03",
		endTime: "2018-09-03 00:00:00",
		userID: 2,
		counsellorID: 2
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
			var et = "2015-00-00 10:10:10"
			Session.update({endTime: et}, function(sesh) {
				expect(sesh.endTime).to.have(et);
				done();
			});
		});
	});

});
