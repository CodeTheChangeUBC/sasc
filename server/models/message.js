const abstract = require('./abstract.js');
const to = require("await-to-js").to;

// Create message 
// - m is a dictionary containing message values
// - 	valueNames, but without ID
exports.create = function(m) {
	return new Promise(async function(resolve, reject) {
		[err, result] = await to(abstract.create('message', m));
		if (err) {
			reject(err);
		} else {
			resolve(result);
		}
	});
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
exports.listByCounsellor = function(counsellorID) {
	return new Promise(async function(resolve, reject) {
		[err, result] = await to(abstract.listByForeignKey('message', 'counsellorID', counsellorID));
		if (err) {
			reject(err);
		} else {
			resolve(result);
		}
	});
}

// Retrieve by user ID
exports.listByUser = function(userID) {
	return new Promise(async function(resolve, reject) {
		[err, result] = await to(abstract.listByForeignKey('message', 'userID', userID));
		if (err) {
			reject(err);
		} else {
			resolve(result);
		}
	});
}

// Retrieve by Session ID
exports.listBySession = function(sessionID) {
	return new Promise(async function(resolve, reject) {
		[err, result] = await to(abstract.listByForeignKey('message', 'sessionID', sessionID));
		if (err) {
			reject(err);
		} else {
			resolve(result);
		}
	});
}

// Retrieve by values
exports.retrieveByValues = function(m) {
	return new Promise(async function(resolve, reject) {
		var values = [m.sessionID, m.userID, m.counsellorID, m.messageTime, 
					m.messageContent, m.fromCounsellor, m.fromTwilio];
		var valueNames = ['sessionID', 'userID', 'counsellorID', 'messageTime', 
					'messageContent', 'fromCounsellor', 'fromTwilio'];
		[err, result] = await to(abstract.retrieveByValues('message', values, valueNames));	
		if (err) {
			reject(err);
		} else {
			resolve(result);
		}
	});
}

// Retrieve messages by ID
exports.retrieveById = function(id) {
	return new Promise(async function(resolve, reject) {
		[err, result] = await to(abstract.retrieve('message', id));
		if (err) {
			reject(err);
		} else {
			resolve(result);
		}
	});
}

// Update message
// - id is ID of message to be updated
// - vals is dictionary of vals to be updated 
exports.update = function(id, vals) {
	return new Promise(async function(resolve, reject) {
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
		[err, result] = await to(abstract.update('message', values, id));
		if (err) {
			reject(err);
		} else {
			resolve(result);
		}
	});
} 

// Destroy message by id
exports.destroy = function(id) {
	return new Promise(async function(resolve, reject) {
		[err, result] = await to(abstract.destroy('message', id));
		if (err) {
			reject(err);
		} else {
			resolve(result);
		}
	});
}





