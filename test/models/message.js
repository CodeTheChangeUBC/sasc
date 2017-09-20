// const messageController = require('../../server/controllers').messages;
// const Message = require('../../server/models').Message;
// const assert = require('assert');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const should = chai.should();
// const expect = chai.expect;
// //const server = require('../../app');

// chai.use(chaiHttp);

// describe('MESSAGE TESTS', function() {

// 	// Clear and reset db before running tests
// 	before(function(done) {
// 		// Destroy all messages
// 		Message.destroy({ where: {} })
// 		.then(function() {
// 			done();
// 		});
// 	});

// 	describe('Create Message', function() {

// 		// Function to test creation of new message
// 		// - m is message to create 
// 		// - offset is expected offset in the count of number of messages
// 		function createMessage(m, offset, done) {
// 			Message.count().then(function(count) {
// 				messageController
// 				.create(m.time, m.content, m.u_id, m.s_id, m.c_id)
// 				.then(function() {
// 					Message.count().then(function(newCount) {
// 						expect(newCount).to.equal(count+offset);
// 						done();
// 					});
// 				});
// 			});
// 		};

		
// 		var m;
// 		// Reset message before each test
// 		beforeEach(function() {
// 			m = {
// 				time: Date(),
// 				content: 'message content',
// 				u_id: 1,
// 				s_id: 2,
// 				c_id: 3,
// 			}
// 		});
		
// 		// Should create valid message 
// 		it('should create new message', function(done) {
// 			createMessage(m,1,done);
// 		});

// 		it('should create new message with no content', function(done) {
// 			m.content = null;
// 			createMessage(m,1,done);
// 		});

// 		// Should not create messages with any key aspects missing
// 		it('should not create new message with no time', function(done) {
// 			m.time = null;
// 			createMessage(m,0,done);
// 		});
// 	});

// 	describe('Listing Messages', function() {
// 		// List messages of user
// 		it('should list all messages of given user', function(done){

// 			messageController
// 			.create(Date(), null, 100,1,1)
// 			.then(function(message) {
// 				messageController.list(message.user_id)
// 				.then(function(messages) {
// 					console.log(messages);
// 					expect(messages.length).to.equal(1);
// 					done();
// 				});
// 			});
// 		});
// 	});
// });
