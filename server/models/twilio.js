const db = require('../db.js');
const abstract = require('./abstract.js');

// Create twilio 
// - twilio is a dictionary containing twilio values
exports.create = function(twilio, callback) {
	abstract.createCallbackVer('twilio', twilio, callback);
}

// Remove twilio
// t is dictionary containing twilio values
exports.retrieveByValues = function(t, callback) {
	var values = [t.email, t.twilioPhoneNumber, t.accountSid, t.authToken];
	var valueNames = ['email', 'twilioPhoneNumber', 'accountSid', 'authToken'];
	abstract.retrieveByValues('twilio', values, valueNames, callback);
}

// Retrieve twilio by id
exports.retrieveByID = function(id, callback) {
	abstract.retrieve('twilio', id, null, callback);
}

// Update twilio
exports.update = function(id, values, callback) {
	abstract.update('twilio', values, id, callback);
};

// Delete twilio object by id
exports.destroy = function(id, callback) {
	abstract.destroy('twilio', id, callback);
}

exports.list = function (callback) {
	abstract.list("twilio", callback);
};

// Count the number of twilio objects
exports.count = function(callback) {
	abstract.count('twilio').then(count => callback(count)).catch(err => callback('',err));
}

// Destroy all Twilios
// Returns a callback that ensures the all sessions are removed when called
// THIS IS FOR TESTING PURPOSES
// ROUTING SHOULD ENSURE THAT THIS CANNOT BE CALLED IN THE APPLICATION
// except for in twilio
exports.destroyAll = function(callback) {	
	abstract.destroyAll('twilio').then(() => callback(null)).catch(err => callback(err));
}