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

	// attributes
	var sessionID = 1;
	var messageTime = '1970-03-01 00:00:00';
	var counsellorID = 2;
	var userID = 2;
	var messageContent = "The first message";
	var fromCounsellor = 1;
	var fromTwilio = 0;

	var message = {
		sessionID: sessionID,
		messageTime: messageTime,
		counsellorID: counsellorID,
		userID: userID,
		messageContent: messageContent,
		fromCounsellor: fromCounsellor,
		fromTwilio: fromTwilio
	}

	// Function to create a message 
	// - expDiff is expected difference in count after creation
	// - expStatus is expected status after sending post request
	function createMessage(msg, expDiff, done) {
		Message.count(count => {
			Message.create(msg,(err,model) => {
				Message.count(newCount => {
					expect(newCount).to.equal(count+expDiff);
					if (err) done(err);
					else done();
				});					
			});
		});
	};

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

		it('should still create new message without message time', function(done) {
			message.messageTime = null;
			createMessage(message, 1, (err) => {
				message.messageTime = messageTime;
				// now delete this extra message
				Message.count(count => {
					Message.destroy(count, (err) => {
						if (err) done(err);
						Message.count(newCount => {
							expect(newCount).to.equal(count-1);
							done();
						})
					});
				});
			});
		});
		
		it('should not create new message without content', function(done) {
			message.messageContent = null;
			createMessage(message, 0, (err) => {
				message.messageContent = messageContent;
				done();
			});
		});

		it('should not create new message without counsellor indicator', function(done) {
			message.fromCounsellor = null;
			createMessage(message, 0, (err) => {
				message.fromCounsellor = fromCounsellor;
				done();
			});
		});

		it('should not create new message twilio indicator', function(done) {
			message.fromTwilio = null;
			createMessage(message, 0, (err) => {
				message.fromTwilio = fromTwilio;
				done();
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
