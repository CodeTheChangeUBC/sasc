const abstract = require('./abstract.js')

// Create message 
// - m is a dictionary containing message values
// - 	valueNames, but without ID
exports.create = function(m, callback) {
	abstract.create('message', m, callback);
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

// Retrieve by counsellor ID
exports.listByCounsellor = function(counsellorID, callback) {
	abstract.listByForeignKey('message', 'counsellorID', counsellorID, callback);
}

// Retrieve by user ID
exports.listByUser = function(userID, callback) {
	abstract.listByForeignKey('message', 'userID', userID, callback);
}

// Retrieve by Session ID
exports.listBySession = function(sessionID, callback) {
	abstract.listByForeignKey('message', 'sessionID', sessionID, callback);
}

// Retrieve by values
exports.retrieveByValues = function(m, callback) {
	var values = [m.sessionID, m.userID, m.counsellorID, m.messageTime, 
				m.messageContent, m.fromCounsellor, m.fromTwilio];
	var valueNames = ['sessionID', 'userID', 'counsellorID', 'messageTime', 
				'messageContent', 'fromCounsellor', 'fromTwilio'];
	abstract.retrieveByValues('message', values, valueNames, callback);	
}

// Retrieve messages by ID
exports.retrieveById = function(id, callback) {
	abstract.retrieve('message', id, null, callback);
}

// Update message
// - id is ID of message to be updated
// - vals is dictionary of vals to be updated 
exports.update = function(id, vals, callback) {
	// First get relevant message
	exports.retrieveById(id, (err, message) => {
		var values = {
			sessionID: vals.sessionID || message.sessionID,
			userID: vals.userID || message.userID,
			counsellorID: vals.counsellorID || message.counsellorID,
			messageTime: vals.messageTime || message.messageTime,
			messageContent: vals.messageContent || message.messageContent,
			fromCounsellor: vals.fromCounsellor || message.fromCounsellor,
			fromTwilio: vals.fromTwilio || message.fromTwilio,
		}
		var valueNames = ['sessionID', 'userID', 'counsellorID', 'messageTime', 
				'messageContent', 'fromCounsellor', 'fromTwilio'];
		abstract.update('message', values, id, null, callback);
	});
} 

// Destroy message by id
exports.destroy = function(id, callback) {
	abstract.destroy('message', id, null, callback);
}





