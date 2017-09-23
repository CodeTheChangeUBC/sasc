const Message = require('../../models').message;
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const server = require('../../app_test');

chai.use(chaiHttp);

// Request server
const app = chai.request(server);

describe('MESSAGE TESTS', function() {

	var m1 = {
		sessionID: 1,
		messageTime: '1970-03-01 00:00:00',
		counsellorID: 2,
		userID: 3,
		messageContent: "The first message",
		fromCounsellor: 1,
		fromTwilio: 0
	}

	var m2 = {
		sessionID: 2,
		messageTime: '1979-03-01 00:00:00',
		counsellorID: 5,
		userID: 1,
		messageContent: "The second message",
		fromCounsellor: 0,
		fromTwilio: 1
	}

	before(function(done) {
		Message.create(m1, (model) => {
			console.log('model: ' + model);
			done();
		});
	});

	// Ensure test setup was correct
	describe('Setup', function() {
		it ('should be 1', function(done) {
			Message.count(count => {
				expect(count).to.equal(1);
				done();
			});
		});		
	});	


	// describe('Create Message', function() {

	// 	it('should create new message', function(done) {
	// 		Message.create(m2,(model) => {
	// 			Message.count(count => {
	// 				expect(count).to.equal(2);
	// 				done();
	// 			});					
	// 		});
	// 	});
	// });

});
