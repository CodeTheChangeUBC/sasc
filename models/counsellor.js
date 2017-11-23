const db = require('../db');
const abstract = require('./abstract');

// Create counsellor from post request
exports.create = function(req, res, callback) {
	var values = {
		firstName: req.body.firstName, 
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password,
	}
	//var valueNames = '(ID,firstName,lastName,email,password)';
	abstract.createCallbackVer('counsellor', values, res, callback);
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
	if (req.body.password) {
		values['password'] = req.body.password;
	}
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

// Retrieve email and password specified by email in req.body
exports.lookupByEmail = function(req, res) {
	abstract.lookupByValue('counsellor', req.body.email, req, res, callback);
}

exports.lookupIdByEmail = function(req, res, callback) {
	abstract.lookupId('counsellor', 'email', req.body.email, req, res, callback);
}

// Retrieve user by id
exports.lookupById = function(req, res) {
	abstract.lookupByValue('counsellor', 'ID', req.body.id, req, res, callback);
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





