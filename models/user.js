const db = require('../db.js');
const abstract = require('./abstract.js');

// Create user from post request
// TODO: Encrypt password
exports.create = function(values, res, callback) {
	values['username'] = values['username'].toLowerCase();
	abstract.createCallbackVer('user', values, res, callback);
}

// Destroy user
exports.destroy = function(req,res) {
	abstract.destroy('user', req.model.ID, res);
}

// Destroy all users
// Returns a promise that ensures the all users are removed when fulfilled
// THIS IS FOR TESTING PURPOSES
// ROUTING SHOULD ENSURE THAT THIS CANNOT BE CALLED IN THE APPLICATION
exports.destroyAll = function(callback) {	
	abstract.destroyAll('user').then(() => callback()).catch(err => callback(err));
}

// Update user 
exports.update = function(req, res) {
	// Get user from request
	var user = req.model;
	// Assign params. If updated params not in request, use older params
	var values = {
		username: req.body.username ? req.body.username : user.username,
		age: req.body.age ? req.body.age : user.age,
		gender: req.body.gender ? req.body.gender : user.gender,
		phoneNumber: req.body.phoneNumber ? req.body.phoneNumber : user.phoneNumber,
		//password: req.body.password ? req.body.password : user.password,
	}
	// Is password being updated?
	if (req.body.password) {
		values['password'] = req.body.password;
	}
	abstract.update('user', values, user.ID, res);	
}

// Lookup user to pass to other functions
exports.lookup = function(req, res, next) {
	abstract.lookup('user', req.params.userId, req, res, next);
}

// Retrieve user specified by userID in params
exports.retrieve = function(req, res) {
	abstract.retrieve('user', req.params.userId, res);
}

// Retrieve username and password specified by username from form field
exports.lookupByUsername = function(username, callback) {
	abstract.lookupByValue('user', 'username', username, callback);
}

// Retrieve ID by username
exports.lookupIdByUsername = function(username, callback) {
	abstract.lookupId('user', 'username', username, callback);
}

// Retrieve user by id
exports.lookupById = function(id, callback) {
	abstract.lookupByValue('user', 'ID', id, callback);
}

// List all users
exports.list = function(req, res) {
	abstract.list('user', res);
}

// Counts the number of users
exports.count = function(callback) {	
	abstract.count('user').then(count => callback(count)).catch(err => callback('',err));
}

// Function to call when returning data or error
function response(err, errCode, data, dataCode, res) {
	if (err) {
		console.log('DB ERROR:: ' + err);
		res.status(errCode).send(err);
		return;
	}
	res.status(dataCode).send(data);
}


