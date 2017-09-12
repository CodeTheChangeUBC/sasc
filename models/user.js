const db = require('../db.js');

// Create user from post request
// TODO: Encrypt password
exports.create = function(req, res) {
	var lastID = this.count();
	var values = [
		lastID,
		req.body.age, 
		req.body.gender,
		req.body.phoneNumber,
		req.body.password,
	]
	db.get().query('INSERT INTO user (age,gender,phoneNumber,password) VALUES (?,?,?,?)', 
		values, 
		function(err, user) {
			response(err, 400, user, 201, res);
		});
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
	return db.get().query('SELECT COUNT(userID) FROM user'), function(err,count) {
		if (err) throw err;
		return count;
	}
}

// Function to call when returning data or error
function response(err, errCode, data, dataCode, res) {
	if (err) {
		res.status(errCode).send(err);
		return;
	}
	res.status(dataCode).send(data);
}


