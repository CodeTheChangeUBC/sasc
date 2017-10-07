const db = require('../db.js');
const abstract = require('./abstract.js');

// Create user from post request
// TODO: Encrypt password
exports.create = function(req, res) {
	var values = [
		parseInt(req.body.age), 
		req.body.gender,
		req.body.phoneNumber,
		req.body.password,
	]
	var valueNames = '(ID,age,gender,phoneNumber,password)';
	abstract.create('user', values, valueNames, res);
}

// Destroy user
exports.destroy = function(req,res) {
	abstract.destroy('user', req.model.ID, res)
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
	var age = req.body.age ? req.body.age : user.age;
	var gender = req.body.gender ? req.body.gender : user.gender;
	var phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : user.phoneNumber;
	var password = req.body.password ? req.body.password : user.password;
	var values = [age, gender, phoneNumber, password, user.ID];
	var valueNames = ['age', 'gender', 'phoneNumber', 'password'];
	// then update user
	abstract.update('user', values, valueNames, res);	
}

// Lookup user to pass to other functions
exports.lookup = function(req, res, next) {
	abstract.lookup('user', req.params.userId, req, res, next);
}

// Retrieve user specified by userID in params
exports.retrieve = function(req, res) {
	abstract.retrieve('user', req.params.userId, res);
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


