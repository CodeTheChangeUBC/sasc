const db = require('../db.js');
const abstract = require('./abstract.js');
const to = require("await-to-js").to;

// Create session
// - s is a session
exports.create = function(s) {
	return new Promise(async function(resolve, reject) {
		[err, results] = await to(abstract.create('session', s));
		if (err) {
			reject(err);
		} else {
			resolve(results);
		}
	});	
}

// Count the number of session objects
exports.count = function(callback) {
	abstract.count('session').then(count => callback(count)).catch(err => callback('',err));
}

// List all the sessions of a given counsellor 
exports.listByCounsellor = function(counsellorID) {
	return new Promise(async function(resolve, reject) {
		[err, results] = await to(abstract.listByForeignKey('session', 'counsellorID', counsellorID));
		if (err) {
			reject(err);
		} else {
			resolve(results);
		}
	});	
}

// List all sessions of a given user
exports.listByUser = function(userID) {
	return new Promise(async function(resolve, reject) {
		[err, results] = await to(abstract.listByForeignKey('session', 'userID', userID));
		if (err) {
			reject(err);
		} else {
			resolve(results);
		}
	});		
}

exports.retrieveByValues = function(session) {
	return new Promise(async function(resolve, reject) {
		var values = [session.beginTime, session.endTime, session.counsellorID, session.userID];
		var valueNames = ['beginTime', 'endTime', 'counsellorID', 'userID'];
		[err, results] = await to(abstract.retrieveByValues('session', values, valueNames));
		if (err) {
			reject(err);
		} else {
			resolve(results);
		}
	});
}

// Retrieve session by id
exports.retrieveById = function(id) {
	return new Promise(async function(resolve, reject) {
		[err, results] = await to(abstract.retrieve('session', id));
		if (err) {
			reject(err);
		} else {
			resolve(results);
		}
	});
}

// Update session
// - id is ID of session to be updated
// - vals is a dictionary of new values
exports.update = function(id, vals) {
	return new Promise(async function(resolve, reject) {
		exports.retrieveByID(id, (err, session) => {
			var values = {
				beginTime: vals.beginTime || session.beginTime,
				endTime: vals.endTime || session.endTime,
				counsellorID: vals.counsellorID || session.counsellorID,
				userID: vals.userID || session.userID,
			}
			//var valueNames = ['beginTime', 'endTime', 'counsellorID', 'userID'];
			[err, results] = await to(abstract.update('session', values, id));
			if (err) {
				reject(err);
			} else {
				resolve(results);
			}
		});
	});
}

// Destroy session
exports.destroy = function(id) {
	return new Promise(async function(resolve, reject) {
		[err, results] = await to(abstract.destroy('session', id));
		if (err) {
			reject(err);
		} else {
			resolve(results);
		}
	});
}

// Destroy all sessions
// Returns a callback that ensures the all sessions are removed when called
// THIS IS FOR TESTING PURPOSES
// ROUTING SHOULD ENSURE THAT THIS CANNOT BE CALLED IN THE APPLICATION
exports.destroyAll = function(callback) {	
	abstract.destroyAll('session').then(() => callback()).catch(err => callback(err));
}
