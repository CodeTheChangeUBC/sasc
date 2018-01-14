// Abstract model which implements common methods 
// for all models 

const db = require('../db.js');
var bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

// DEPRECATED VERSION
// Create model 
// - Values should contain (ordered) values for SQL insert
// - model is name of model (string)
// - valueNames is string containing all values needed for creation
// - should have form: (ID, val1, val2, ...., valn)
// - if callback is specified, call callback instead of res
// exports.create = function(model, values, res, callback) {
// 	exports.count(model).then(lastID => {
// 		values['ID'] = lastID+1;
// 		exports.process(values, values => {
// 			db.get().query('INSERT INTO '+model+' SET ?', values, 
// 				(err, results) => {
// 					if (res) { httpResponse(err, 400, results, 201, res); }
// 					else { noHttpResponse(err, results, callback); }
// 			});
// 		});	
// 	}).catch(error => {
// 		if (callback) { callback(error); }
// 		else { httpResponse(error, 400, null, null, res); }
// 	});
// }


// Create model 
// - Values is dictionary containing model values
// - model is name of model (string)
exports.create = function(model, values, callback) {
	exports.process(values, values => {
		db.get().query('INSERT INTO '+model+' SET ?', values, 
		(err, results) => {
			if (err) { callback(err); }
			else { callback(null); }

// Hash password
exports.process = function(values, callback) {
	if (values.password) {
	    bcrypt.hash(values.password, SALT_ROUNDS, function(err, hash) {
	    	values.password = hash;
	        callback(values);
		});
	} else { callback(values); }
}

// compare password
exports.comparePassword = function(password, hash, callback) {
 	bcrypt.compare(password, hash, function(err, res) {
 	    if (err) { return callback(err, null); }

 	    callback(null, res);
 	});
}

// Destroy model
// - model is name of model (string)
// - id is the id of the model to be destroyed
exports.destroy = function(model, id, callback) {
	db.get().query('DELETE FROM '+model+' WHERE ID=?;', 
		[id], 
		function(err, result) {
			if (err) callback(err);
			else callback(null, result);
		});
}

// Update model 
// - model is name of model (string)
// - values is ordered set of values to update (should include model id last)
// - valueNames is array containing the names of the values to be inserted
// (not including id)
exports.update = function(model, values, id, callback) {
	var query = db.get().query('UPDATE '+model+' SET ? WHERE ID=?', [values, id], function(err, results, fields) {
			if (err) callback(err);
			callback(null, results);
	});
}

// Lookup model to pass to other functions
// - model is name of model (string)
// - id is id of model (int)
exports.lookup = function(model, id, req, callback) {
	db.get().query('SELECT * FROM '+model+' WHERE ID=?;', [id],
		function(err, results, fields) {
			if (err) callback(err);
			req.model = results[0];
			callback(null);
		});
}

// Retrieve model by values instead of ID
exports.retrieveByValues = function(model, values, valueNames, callback) {
	var query = 'SELECT * FROM '+model+' WHERE';
	query += fieldQueries(valueNames,1);
	db.get().query(query, values, function(err,results,fields) {
			console.log('Error: ' + err);
			if (err) { callback(err); }
			callback(null, results);
		});
}

// Retrieve user specified by userID in params
// - if res is null, call callback upon completion
exports.retrieve = function(model, id, callback) {
	db.get().query('SELECT * FROM '+model+' WHERE ID=?;', 
		[id],
		function(err, result) {
			if (err) callback(err);
			callback(null,result[0])
		});
}

// Retrieve value specified by identifier
exports.lookupByValue = function(model, identifier, value, callback) {
	db.get().query('SELECT * FROM ' + model + ' WHERE ' + identifier + ' = ?;',
		[value], 
		function (err, rows) {
		if (err) { callback(err, null); }
		else { callback(null, rows); }
	});
}

// Retrieve ID from email or username
exports.lookupId = function(model, identifier, value, callback) {
	db.get().query('SELECT ID FROM ' + model + ' WHERE ' + identifier + ' = ?;',
		[value],
		function (err, result) {
			if (err) { callback(err, null); }
			else { callback(null, result[0].ID); }
		});
}


// List all models
// - model is name of model (string)
exports.list = function(model, callback) {
	db.get().query('SELECT * FROM '+model+';', callback(err, models));
}

// Counts the number of models
// - model is name of model (string)
exports.count = function(model) {	
	return new Promise(function(fulfill, reject) {
		db.get().query('SELECT COUNT(ID) AS count FROM '+model+';', function(err,results,fields) {			
			if (err) { reject(err); }
			fulfill(results[0].count);
		});	
	});
}

exports.countCallbackVer = function(model, callback) {	
	db.get().query('SELECT COUNT(ID) AS count FROM '+model+';', function(err, results) {			
		if (err) { callback(err, null); }
		else { callback(null, results[0].count); }
	});
}

// Destroy all models
// Returns a promise that ensures the all models are removed when fulfilled
// THIS IS FOR TESTING PURPOSES
// ROUTING SHOULD ENSURE THAT THIS CANNOT BE CALLED IN THE APPLICATION
// - model is name of model (string)
exports.destroyAll = function(model) {
	return new Promise(function(fulfill, reject) {
		db.get().query('DELETE FROM '+model, function(err,result) {
			if (err) { reject(err); }
			fulfill();
		});
	});
}

// List all models corresponding to foreign key
// - model is name of model (string)
// - foreign key is name of foreign key (string)
// - id is id of foreign key
exports.listByForeignKey = function(model, fk, id, callback) {
	db.get().query('SELECT * FROM '+model+' WHERE '+fk+'=?', [id], 
		function(err, results, fields) {
			if (err) { callback(err); }
			callback(null,results);
		});
}

// Function to call when returning data or error in NON Http response
// - err is error (if any) 
// - data is data to return
// - toCall is function to call
function noHttpResponse(err,data,toCall) {
	if (err) { toCall(err); }
	else { toCall(null,data); }
}

// Function to call when returning data or error in Http response
function httpResponse(err, errCode, data, dataCode, res) {
	if (err) {
		res.status(errCode).send(err);
		return;
	}
	res.status(dataCode).send(data);
}

// Compute string of ' field1=?, ... , fieldn=?'
// Returned string starts with a space!
// - if and === 1 use AND instead of commas
function fieldQueries(fields, and) {
	var query = '';
	for (var j=0; j<fields.length; j++) {
		query += ' '+fields[j]+'=?';
		if (j!=fields.length-1) {
			if (and) { query += ' AND'; }
			else { query += ','; }
		}
	}
	return query;
}

exports.noHttpResponse = noHttpResponse;
exports.httpResponse = httpResponse;



