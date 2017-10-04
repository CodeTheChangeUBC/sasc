const Counsellor = require('../../models').counsellor
const User = require('../../models').user
const Session = require('../../models').session
const Message = require('../../models').message

// Users
exports.user1 = {
	age: 30,
	gender: 'female',
	phoneNumber: '(604) 111-1111',
	password: 'user1pass'
}

exports.user2 = {
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


// Initialize db by inputting initial data
exports.setup = function(db,app,done) {
	app
	.post('/users')
	.send(exports.user1)
	.end(function(err, res) {
		app
		.post('/users')
		.send(exports.user2)
		.end(function(err, res) {
			app
			.post('/counsellors')
			.send(exports.couns1)
			.end(function(err, res) {
				app
				.post('/counsellors')
				.send(exports.couns2)
				.end(function(err, res) {
					Session.create(exports.session1, function() {
						Session.create(exports.session2, function() {
							done();
						});
					});
				});
			});
		});
	});
}

// Number of models input into db
exports.userCount = 2;
exports.counsellorCount = 2;
exports.sessionCount = 2;

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
					done()
				});
			});
		});
	});
}
