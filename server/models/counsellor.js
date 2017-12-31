const db = require('../db');
const abstract = require('./abstract');

// Create counsellor from post request
exports.create = function(values, callback) {
	values['email'] = values['email'].toLowerCase();
	abstract.createCallbackVer('counsellor', values, callback);
}

// Update counsellor
exports.update = function(req, res) {
	// Get counsellor
	var counsellor = req.model;
	// Assign params. If updated params not in request, use older params
	var values = {
		firstName: req.body.firstName ? req.body.firstName : counsellor.firstName,
		lastName: req.body.lastName ? req.body.lastName : counsellor.lastName,
		email: req.body.email ? req.body.email : counsellor.email,
		
	}
	// Add password if there
	if (req.body.password) { values['password'] = req.body.password; }
	// then update counsellor
	abstract.update('counsellor', values, counsellor.ID, res);	
}

// list all counsellors
exports.list = function(req, res) {
	abstract.list('counsellor', res)
}

// retrieve single counsellor 
exports.retrieve = function(req, res) {
	abstract.retrieve('counsellor', req.params.counsellorId, res);
}

// Retrieve counsellor by values
exports.retrieveByValues = function(values, callback) {
	abstract.retrieveByValues('counsellor', values, callback);
}

// Retrieve email and password specified by email in req.body
exports.lookupByEmail = function(email, callback) {
	abstract.lookupByValue('counsellor', 'email', email, callback);
}

// Retrieve counsellor ID from email
exports.lookupIdByEmail = function(email, callback) {
	abstract.lookupId('counsellor', 'email', email, callback);
}

// Retrieve user by id
exports.lookupById = function(id, callback) {
	abstract.lookupByValue('counsellor', 'ID', id, callback);
}

// destroy given counsellor
exports.destroy = function(req, res) {
	abstract.destroy('counsellor', req.model.ID, res);
}

// Count number of cousellors in db
exports.count = function(callback) {
	abstract.count('counsellor').then(count => callback(count)).catch(err => callback('',err));
}

// Lookup counsellor to pass to other functions (update and destroy)
exports.lookup = function(req, res, next) {
	abstract.lookup('counsellor', req.params.counsellorId, req, res, next);
}


// Destroy all counsellors
// Returns a promise that ensures the all counsellors are removed when fulfilled
// THIS IS FOR TESTING PURPOSES
// ROUTING SHOULD ENSURE THAT THIS CANNOT BE CALLED IN THE APPLICATION
exports.destroyAll = function(callback) {	
	abstract.destroyAll('counsellor').then(() => callback()).catch(err =>  callback(err))
}
