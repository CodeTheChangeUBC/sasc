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
	beginTime: "00:01:03",
	counsellorID: 1,
	userID: 2,
}

exports.session2 = {
	beginTime: "00:00:00",
	counsellorID: 2,
	userID: 2,
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
			.send(couns1)
			.end(function(err, res) {
				app
				.post('/counsellors')
				.send(exports.couns2)
				.end(function(err, res) {
					Session.create(session1, () => {
						Session.create(session2, () => {
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
