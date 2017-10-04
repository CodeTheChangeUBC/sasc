const db = require('../db.js')
const abstract = require('./abstract.js')

// Create session
// - s is a session
exports.create = function(s, callback) {
	var values = [s.beginTime, s.endTime, s.counsellorID, s.userID];
	var valueNames = '(ID, beginTime, endTime, counsellorID, userID)';
	abstract.create('session', values, valueNames, null, callback)

}

// Count the number of session objects
exports.count = function(callback) {
	abstract.count('session').then(count => callback(count)).catch(err => callback('',err));
}

// List all the sessions of a given counsellor 
exports.listByCounsellor = function(counsellorID, callback) {
	abstract.listByForeignKey('session', 'counsellorID', counsellorID, callback);
	// db.get().query('SELECT * FROM session WHERE counsellorID=?', [counsellorID], 
	// 	function(err, results, fields) {
	// 		if (err) callback(err);
	// 		callback(results);
	// 	});
}

// List all sessions of a given user
exports.listByUser = function(userID, callback) {
	abstract.listByForeignKey('session', 'userID', userID, callback);
	// db.get().query('SELECT * FROM session WHERE userID=?', [counsellorID], 
	// 	function(err, results, fields) {
	// 		if (err) callback(err);
	// 		console.log('list results:' + JSON.stringify(results));
	// 		callback(results);
	// 	});
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
