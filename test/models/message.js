const Message = require('../../models').message;
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

describe('MESSAGE TESTS', function() {

	var message = {
		sessionID: 1,
		messageTime: '1970-03-01 00:00:00',
		counsellorID: 2,
		userID: 2,
		messageContent: "The first message",
		fromCounsellor: 1,
		fromTwilio: 0
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
			Message.count((count,err) => {
				if (err) done(err);
				expect(count).to.equal(setup.messageCount);
				done();
			});
		});		
	});	


	describe('Create Message', function() {
		it('should create new message', function(done) {
			Message.create(message,(err,model) => {
				if (err) done(err);
				Message.count(count => {
					expect(count).to.equal(setup.messageCount+1);
					done();
				});					
			});
		});
		
		it('should not create new message without content', function(done) {
			message.messageContent = null;
			Message.count(count => {
				Message.create(message, (err, model) => {
					Message.count(newCount => {
						expect(newCount).to.equal(count);
						// reset message content
						message.messageContent = "The first message";
						done();
					});
				});
			});
		});
	});

	describe('Retrieval', function() {
		it('should retrieve messages by counsellor ID', function(done) {
			Message.listByCounsellor(1, (err, messages) => {
				if (err) done(err);
				expect(messages.length).to.equal(1);
				expect(messages).to.be.an('array');
				expect(messages[0]).to.include({'counsellorID': 1})
				done();
			});
		});

		it('should retrieve messages by user ID', function(done) {
			Message.listByUser(2, (err, messages) => {
				if (err) done(err);
				expect(messages.length).to.equal(2);
				expect(messages).to.be.an('array');
				expect(messages[0]).to.include({'userID': 2})
				expect(messages[1]).to.include({'userID': 2})
				done();
			});
		});

		it('should retrieve messages by Session ID', function(done) {
			Message.listBySession(1, (err,messages) => {
				if (err) done(err);
				expect(messages.length).to.equal(2);
				expect(messages).to.be.an('array');
				expect(messages[0]).to.include({'sessionID': 1})
				expect(messages[1]).to.include({'sessionID': 1})
				done();
			})
		});

		it('should retrieve message by id', function(done) {
			Message.retrieveById(3,(err, m) => {
				if (err) done(err);
				expect(m).to.include({'ID': 3, 'userID': 2, 'counsellorID':2});
				done();
			})
		});

		it('should retrieve message by values', function(done) {
			Message.retrieveByValues(message,(err, m) => {
				if (err) done(err);
				expect(m).to.be.an('array');
				expect(m.length).to.equal(1);
				expect(m[0]).to.include({'ID': 3, 'userID': 2, 'counsellorID':2});
				done();
			});
		});
	});

	describe('Update', function() {
		it('should update message content', function(done) {
			Message.update(setup.messageCount+1, {'messageContent': 'newContent!'}, (err,mess) => {
				if (err) done(err);
				Message.retrieveById(setup.messageCount+1, (err, m) => {
					if (err) done(err);
					expect(m).to.include({messageContent: 'newContent!'});
					done();
				});
			});
		});

		it('should update userID, counsellor and session IDs', function(done) {
			var newVals = {userID:1, counsellorID:1, sessionID:2};
			Message.update(setup.messageCount+1, newVals, (err) => {
				Message.retrieveById(setup.messageCount+1, (err, m) => {
					if (err) done(err);
					expect(m).to.include(newVals);
					done();
				});
			});
		});
	});

	describe('Destroy', function() {
		it('should destroy message', function(done) {
			Message.count((count,err) => {
				if (err) done(err);
				Message.destroy(setup.messageCount+1, (err) => {
					if (err) done(err);
					Message.count((newCount,err) => {
						if (err) done(err);
						expect(newCount).to.equal(count-1);
						done();
					});
				});	
			});
		});

		it('should not destroy non existent message', function(done) {
			Message.count((count,err) => {
				if (err) done(err);
				Message.destroy(setup.messageCount+2, (err) => {
					if (err) done(err);
					Message.count((newCount,err) => {
						if (err) done(err);
						expect(newCount).to.equal(count);
						done();
					});
				});	
			});
		});
	});


});
