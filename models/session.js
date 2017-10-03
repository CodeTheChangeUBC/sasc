const db = require('../db.js')
const abstract = require('./abstract.js')

// Create session
// - s is a session
exports.create = function(s, callback) {
	var values = [s.ID, s.beginTime, s.counsellorID, s.userID];
	var valueNames = '(ID, beginTime, counsellorID, userID)';
	abstract.create('session', values, valueNames, null, callback)

}

// Count the number of session objects
exports.count = function(callback) {
	abstract.count('message').then(count => callback(count)).catch(err => callback('',err));
}

// Destroy session
exports.destroy = function(id, callback) {
	abstract.destroy('session', id, null, callback);
}

