const db = require('../db.js');
const abstract = require('./abstract.js');

// Create twilio 
// - twilio is a dictionary containing twilio values
exports.create = function(twilio, callback) {
	abstract.create('twilio', twilio, null, callback);
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
//  - id is ID of twilio object to be updated
// - vals is a dictionary containing the values to be updated. 
exports.update = function(id, vals, callback) {
	exports.retrieveByID(id, (err, twilio) => {
		var values = {
			email: vals.email || twilio.email,
			twilioPhoneNumber: vals.twilioPhoneNumber || twilio.twilioPhoneNumber,
			accountSid: vals.accountSid || twilio.twilioPhoneNumber,
			authToken: vals.authToken || twilio.authToken
		}
		abstract.update('twilio', values, id, null, callback);
	});
}

// Delete twilio object by id
exports.destroy = function(id, callback) {
	abstract.destroy('twilio', id, null, callback);
}

// Count the number of twilio objects
exports.count = function(callback) {
	abstract.count('twilio').then(count => callback(count)).catch(err => callback('',err));
}

// Destroy all Twilios
// Returns a callback that ensures the all sessions are removed when called
// THIS IS FOR TESTING PURPOSES
// ROUTING SHOULD ENSURE THAT THIS CANNOT BE CALLED IN THE APPLICATION
exports.destroyAll = function(callback) {	
	abstract.destroyAll('twilio').then(() => callback()).catch(err => callback(err));
}