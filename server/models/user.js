const db = require('../db.js');
const abstract = require('./abstract.js');

// Create user from post request
exports.create = function(values, callback) {
	if (values['username']) {
		values['username'] = values['username'].toLowerCase();
	}
	abstract.create('user', values, callback);
}

// Destroy user
exports.destroy = function(id, callback) {
	abstract.destroy('user', id, callback);
}

// Destroy all users
// Returns a promise that ensures the all users are removed when fulfilled
// THIS IS FOR TESTING PURPOSES
// ROUTING SHOULD ENSURE THAT THIS CANNOT BE CALLED IN THE APPLICATION
exports.destroyAll = function(callback) {	
	abstract.destroyAll('user').then(() => callback(null)).catch(err => callback(err));
}

// Update user 
// values should contain object of values to be updated
// id is id of user being updated
exports.update = function(values, id, callback) {
	abstract.update('user', values, id, callback);	
}

// Retrieve user specified by id
exports.retrieve = function(id, callback) {
	abstract.retrieve('user', id, res);
}

// Retrieve username and password specified by username in params
exports.getUserCredentialsByUsername = function(username, callback) {
	db.get().query('SELECT username, password FROM user WHERE username = '+username+';',
		[username],
		callback);
}

// Retrieve username and password specified by username from form field
exports.lookupByUsername = function(username, callback) {
	abstract.lookupByValue('user', 'username', username, callback);
}

// Retrieve user by id
exports.lookupById = function(id, callback) {
	abstract.lookupByValue('user', 'ID', id, callback);

}

// List all users
exports.list = function(callback) {
	abstract.list('user', callback);
}

// Counts the number of users
exports.count = function(callback) {	
	abstract.count('user').then(count => callback(count)).catch(err => callback('',err));
}



