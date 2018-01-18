const db = require('../db');
const abstract = require('./abstract');

// Create counsellor from post request
exports.create = function(values, callback) {
	values['email'] = values['email'].toLowerCase();
	abstract.create('counsellor', values, callback);
}

// Update counsellor
// values is object countaining values to be updated
// id is id of counsellor being updated
exports.update = function(values, id, callback) {
	abstract.update('counsellor', values, id, callback);
}

// list all counsellors
exports.list = function(values, callback) {
	abstract.list('counsellor', callback);
}

// retrieve single counsellor 
exports.retrieve = function(values, callback) {
	abstract.retrieve('counsellor', req.params.counsellorId, callback);
}

// Retrieve counsellor by values
exports.retrieveByValues = function(values, callback) {
	abstract.retrieveByValues('counsellor', values, callback);
}

// Lookup counsellor by email
exports.lookupByEmail = function(email, callback) {
	abstract.lookupByValue('counsellor', 'email', email, callback);
}

// Retrieve user by id
exports.lookupById = function(id, callback) {
	abstract.lookupByValue('counsellor', 'ID', id, callback);
}

// destroy given counsellor
exports.destroy = function(id, callback) {
	abstract.destroy('counsellor', id, callback);
}

// Count number of cousellors in db
exports.count = function(callback) {
	abstract.count('counsellor').then(count => callback('',count)).catch(err => callback(err));
}

// Destroy all counsellors
// Returns a promise that ensures the all counsellors are removed when fulfilled
// THIS IS FOR TESTING PURPOSES
// ROUTING SHOULD ENSURE THAT THIS CANNOT BE CALLED IN THE APPLICATION
exports.destroyAll = function(callback) {	
	abstract.destroyAll('counsellor').then(() => callback()).catch(err =>  callback(err))
}





