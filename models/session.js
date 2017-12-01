const db = require('../db.js')
const abstract = require('./abstract.js')

// Create session
// - s is a session
exports.create = function(s, callback) {
	abstract.create('session', s, null, callback)

}

// Count the number of session objects
exports.count = function(callback) {
	abstract.count('session').then(count => callback(count)).catch(err => callback('',err));
}

// List all the sessions of a given counsellor 
exports.listByCounsellor = function(counsellorID, callback) {
	abstract.listByForeignKey('session', 'counsellorID', counsellorID, callback);
}

// List all sessions of a given user
exports.listByUser = function(userID, callback) {
	abstract.listByForeignKey('session', 'userID', userID, callback);
}

exports.retrieveByValues = function(session, callback) {
	var values = [session.beginTime, session.endTime, session.counsellorID, session.userID];
	var valueNames = ['beginTime', 'endTime', 'counsellorID', 'userID'];
	abstract.retrieveByValues('session', values, valueNames, callback);
}

// Retrieve session by id
exports.retrieveByID = function(id, callback) {
	abstract.retrieve('session', id, null, callback);
}

// Update session
// - id is ID of session to be updated
// - vals is a dictionary of new values
exports.update = function(id, vals, callback) {
	exports.retrieveByID(id, (err, session) => {
		var values = {
			beginTime: vals.beginTime || session.beginTime,
			endTime: vals.endTime || session.endTime,
			counsellorID: vals.counsellorID || session.counsellorID,
			userID: vals.userID || session.userID,
		}
		//var valueNames = ['beginTime', 'endTime', 'counsellorID', 'userID'];
		abstract.update('session', values, id, null, callback)
	});
}

// Destroy session
exports.destroy = function(id, callback) {
	abstract.destroy('session', id, null, callback);
}

// Destroy all sessions
// Returns a callback that ensures the all sessions are removed when called
// THIS IS FOR TESTING PURPOSES
// ROUTING SHOULD ENSURE THAT THIS CANNOT BE CALLED IN THE APPLICATION
exports.destroyAll = function(callback) {	
	abstract.destroyAll('session').then(() => callback()).catch(err => callback(err));
}
