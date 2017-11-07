const db = require('../db.js')
const abstract = require('./abstract.js')

// Create counsellor from post request
exports.create = function(req, res) {
	var values = {
		firstName: req.body.firstName, 
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password,
	}
	//var valueNames = '(ID,firstName,lastName,email,password)';
	abstract.create('counsellor', values, res);
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

// Retrieve email and password specified by email in params
exports.getCounsellorCredentialsByEmail = function(req, res) {
	abstract.getCounsellorCredentialsByEmail(req.body.email, res);
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





