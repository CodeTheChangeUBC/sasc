const db = require('../db.js')
const abstract = require('./abstract.js')

// Create message 
// - m is a dictionary containing message values
// - 	valueNames, but without ID
exports.create = function(m, callback) {
	var values = [m.sessionID, m.messageTime, m.counsellorID,m.userID,
					m.messageContent,m.fromCounsellor,m.fromTwilio]
	var valueNames = '(ID,sessionID,messageTime,counsellorID,userID,' + 
					'messageContent,fromCounsellor,fromTwilio)';	
	abstract.create('message', values, valueNames, null, callback)
}

// counts number of message
exports.count = function(callback) {
	abstract.count('message').then(count => callback(count)).catch(err => callback('',err));
}

// Destroy all sessions
// Returns a callback that ensures the all sessions are removed when called
// THIS IS FOR TESTING PURPOSES
// ROUTING SHOULD ENSURE THAT THIS CANNOT BE CALLED IN THE APPLICATION
exports.destroyAll = function(callback) {	
	abstract.destroyAll('message').then(() => callback()).catch(err => callback(err));
}
