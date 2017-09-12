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
	})
	.catch(error => response(error, 400, null, null, res));
}

// Destroy user
exports.destroy = function(req,res) {
	var values = [
		req.body.age, 
		req.body.gender,
		req.body.phoneNumber,
	]
	db.get().query('DELETE FROM user WHERE user_id=? AND gender=? AND phoneNumber=?', 
		values, 
		function(err, result) {
			response(err, 400, { message: 'User deleted successfully' }, 200, res);
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
	// First get user 
	db.get().query('SELECT * FROM user WHERE ID=?', 
		[req.params.userID], 
		function(err, user) {
			if (err) {
				res.status(400).send(err);
			}
			var age = req.body.age ? req.body.age : user.age;
			var gender = req.body.gender ? req.body.gender : user.gender;
			var phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : user.phoneNumber;
			var password = req.body.password ? req.body.password : user.password;
			var values = [age, gender, phoneNumber, password];
			// then update user
			db.get().query('UPDATE user SET age=?, gender=?, phoneNumber=?, password=?', 
				values, 
				function(err, user) {
					response(err, 400, user, 200, res);
			});
		});
}

// Retrieve user specified by userID in params
exports.retrieve = function(req, res) {
	db.get().query('SELECT * FROM user WHERE userID = ?', 
		[req.params.userID],
		function(err, user) {
			response(err, 400, user, 200, res);
		});
}

// List all users
exports.list = function(req, res) {
	console.log('GOING TO LIST CLIENTS');
	db.get().query('SELECT * FROM user', function(err,users) {
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


