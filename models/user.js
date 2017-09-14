const db = require('../db.js');

// Create user from post request
// TODO: Encrypt password
exports.create = function(req, res) {
	exports.count()
	.then(function(lastID) {
		var values = [
			lastID+1,
			parseInt(req.body.age), 
			req.body.gender,
			req.body.phoneNumber,
			req.body.password,
		]
		db.get().query("INSERT INTO user (ID,age,gender,phoneNumber,password) VALUES (?,?,?,?,?);", 
			values, 
			function(err, user) {
				response(err, 400, user, 201, res);
			});
	}).catch(error => response(error, 400, null, null, res));
}

// Destroy user
exports.destroy = function(req,res) {
	db.get().query('DELETE FROM user WHERE ID=?;', 
		[req.user.ID], 
		function(err, result) {
			response(err, 400, { message: 'User deleted successfully' }, 204, res);
		});
}

// Destroy all users
// Returns a promise that ensures the all users are removed when fulfilled
// THIS IS FOR TESTING PURPOSES
// ROUTING SHOULD ENSURE THAT THIS CANNOT BE CALLED IN THE APPLICATION
exports.destroyAll = function() {
	return new Promise(function(fulfill, reject) {
		db.get().query('DELETE FROM user', function(err,result) {
			if (err) reject(err);
			fulfill();
		});
	});
}

// Update user 
exports.update = function(req, res) {
	// Get user from request
	var user = req.user;
	// Assign params. If updated params not in request, use older params
	var age = req.body.age ? req.body.age : user.age;
	var gender = req.body.gender ? req.body.gender : user.gender;
	var phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : user.phoneNumber;
	var password = req.body.password ? req.body.password : user.password;
	var values = [age, gender, phoneNumber, password, user.ID];
	// then update user
	db.get().query('UPDATE user SET age=?, gender=?, phoneNumber=?, password=? WHERE ID=?', 
		values, 
		function(err, results) {
			response(err, 400, results[0], 200, res);
	});
}

// Lookup user to pass to other functions
exports.lookup = function(req, res, next) {
	db.get().query("SELECT * FROM user WHERE ID=?;", [req.params.userId],
		function(err, results, fields) {
			if (err) {
				res.status(404).send(err);
				next();
			}
			req.user = results[0];
			next();
		});
}

// Retrieve user specified by userID in params
exports.retrieve = function(req, res) {
	db.get().query("SELECT * FROM user WHERE ID = ?;", 
		[req.params.userId],
		function(err, user) {
			response(err, 400, user[0], 200, res);
		});
}

// List all users
exports.list = function(req, res) {
	db.get().query('SELECT * FROM user;', function(err,users) {
		response(err, 400, users, 200, res);
	});
}

// Counts the number of users
exports.count = function() {	
	return new Promise(function(fulfill, reject) {
		db.get().query("SELECT COUNT(ID) AS count FROM user;", function(err,results,fields) {			
			if (err) reject(err);
			fulfill(results[0].count);
		});	
	});
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


