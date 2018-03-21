const db = require('../db.js');
const abstract = require('./abstract.js');
const to = require("await-to-js").to;

// Create user from post request
exports.create = function(values) {
	return new Promise(async function(resolve, reject) {
		let err, results;
		if (values['username']) {
			values['username'] = values['username'].toLowerCase();
		}
		values['email'] = values['email'].toLowerCase();
		[err, results] = await to(abstract.create('user', values));
		if (err) {
			reject(err);
		} else {
			resolve(results);
		}
	});
}

// Destroy user
exports.destroy = function(id) {
	return new Promise(async function(resolve, reject) {
		let err, result;
		[err, result] = await to(abstract.destroy('user', id));
		if (err) {
			reject(err);
		} else {
			resolve(result);
		}
	});
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
exports.update = function(values, id) {
	return new Promise(async function(resolve, reject) {
		let err, results;
		[err, results] = await to(abstract.update('user', values, id));
		if (err) {
			reject(err);
		} else {
			resolve(results);
		}
	});
}

// Retrieve user specified by id
exports.retrieve = function(values) {
	return new Promise(async function(resolve, reject) {
		let err, result;
		[err, result] = await to(abstract.retrieve('user', req.params.userId));
		if (err) {
			reject(err);
		} else {
			resolve(result);
		}
	});
}

// Retrieve username and password specified by username from form field
exports.lookupByCredential = function(username) {
	return new Promise(async function(resolve, reject) {
		let err, rows;
		[err, rows] = await to(abstract.lookupByValue('user', 'username', username));
		if (err) {
			reject(err);
		} else {
			resolve(rows);
		}
	});
}

// Retrieve user by id
exports.lookupById = function(id) {
	return new Promise(async function(resolve, reject) {
		let err, rows;
		[err, rows] = await to(abstract.lookupByValue('user', 'ID', id));
		if (err) {
			reject(err);
		} else {
			resolve(rows);
		}
	});
}

// List all users
exports.list = function(values) {
	return new Promise(async function(resolve, reject) {
		let err, models;
		[err, models] = await to(abstract.list('user'));
		if (err) {
			reject(err);
		} else {
			resolve(models);
		}
	});
}

// Counts the number of users
exports.count = function(callback) {	
	abstract.count('user').then(count => callback(count)).catch(err => callback('',err));
}



