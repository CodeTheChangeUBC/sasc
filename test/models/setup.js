const Counsellor = require('../../models').counsellor
const User = require('../../models').user
const Session = require('../../models').session
const Message = require('../../models').message
const Twilio = require('../../models').twilio

// Users
exports.user1 = {
	username: 'tammy',
	age: 30,
	gender: 'female',
	phoneNumber: '(604) 111-1111',
	password: 'user1pass'
}

exports.user2 = {
	username: 'bobby123',
	age: 25,
	gender: 'other',
	phoneNumber: '6049999999',
	password: 'user2pass'
}

// Counsellors 
exports.couns1 = {
	firstName: 'counsellor',
	lastName: 'one',
	email: 'email@email.ca',
	password: 'password'
}

exports.couns2 = {
	firstName: 'counsellor',
	lastName: 'two',
	email: 'email@email.ca',
	password: 'password2'
} 

// Sessions
exports.session1 = {
	beginTime: "1970-01-01 00:01:03",
	endTime: "1970-01-01 02:07:20",
	counsellorID: 1,
	userID: 2,
}

exports.session2 = {
	beginTime: "2017-03-04 00:00:00",
	endTime: "2017-03-05 12:03:22",
	counsellorID: 2,
	userID: 1,
}

// Messages
exports.message1 = {
	sessionID: 1,
	counsellorID: 1,
	userID: 1,
	messageTime: "2014-03-04 00:00:50",
	messageContent: "Content 1",
	fromCounsellor: 0,
	fromTwilio: 0,
}

exports.message2 = {
	sessionID: 2,
	counsellorID: 2,
	userID: 2,
	messageTime: "2015-01-04 00:10:40",
	messageContent: "Content 2",
	fromCounsellor: 0,
	fromTwilio: 1,
}

exports.twilio1 = {
	email: "email@email.com",
	twilioPhoneNumber: '6047778888',
	accountSid: '746503745',
	authToken: '4Eydj677fG'
}

exports.twilio2 = {
	email: "email2@email2.com",
	twilioPhoneNumber: '6048887777',
	accountSid: '111111111',
	authToken: '19874kbdvfl0'
}

function createMessages(callback) {
	Message.create(exports.message1, () => {
		Message.create(exports.message2, () => {
			callback();
		});
	});			
}

function createSessions(callback) {
	Session.create(exports.session1, () => {
		Session.create(exports.session2, () => {
			callback();
		});
	});
}

function createTwilios(callback) {
	Twilio.create(exports.twilio1, () => {
		Twilio.create(exports.twilio2, () => {
			callback();
		});
	});
}

function createHttp(app, url, object, callback) {
	app.post(url).send(object).end((err,res) => {
		callback();
	});
}

function createAllHttp(app,callback) {
	createHttp(app,'/users',exports.user1, () => {
		createHttp(app,'/users', exports.user2, () => {
			createHttp(app, '/counsellors', exports.couns1, () => {
				createHttp(app, '/counsellors', exports.couns2, callback)
			});
		});
	});
}




// Initialize db by inputting initial data
exports.setup = function(db,app,done) {
	createAllHttp(app, () => {
		createSessions(() => {
			createMessages(() => {
				createTwilios(() => {
					done();
				})
			});
		});
	});
}

// Number of models input into db
exports.userCount = 2;
exports.counsellorCount = 2;
exports.sessionCount = 2;
exports.messageCount = 2;

// Wipe test db of all models
exports.resetDb = function(db,app,done) {
	// Wipe messages
	Message.destroyAll((err) => {
		if (err) done(err);
		// Wipe Sessions
		Session.destroyAll((err) => {
			if (err) done(err);
			// Wipe users
			User.destroyAll((err) => {
				if (err) done(err);
				// Wipe counsellors 
				Counsellor.destroyAll((err) => {
					if (err) done(err);
					// Wipe Twilios
					Twilio.destroyAll((err) => {
						if (err) done(err);
						done();
					});
				});
			});
		});
	});
}
