// Abstract model which implements common methods 
// for all models 

const db = require('../db.js');
var bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const emailRegex = require('email-regex');

// Create model 
// - Values is dictionary containing model values
// - model is name of model (string)
exports.create = function(model, values) {
	return new Promise(function(resolve, reject) {
		db.get().query('INSERT INTO '+model+' SET ?', values, 
			function(err, results) {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
	 	});
	});
}

// Hash password
exports.process = function(values) {
	return new Promise(function(resolve, reject) {
		if (values.password) {
		    bcrypt.hash(values.password, SALT_ROUNDS, function(err, hash) {
		    	if (err) {
		    		reject(err);
		    	} else {
		    		values.password = hash;
		        	resolve(values);
		    	}
			});
		} else {
			reject("Password does not exist.");
		}
	});
}

exports.hashOne = function (password) {
	return new Promise(function(resolve, reject) {
		bcrypt.hash(password, SALT_ROUNDS, function (err, hash) {
			if (err) {
				reject(err);
			} else {
				resolve(hash);
			}
		});
	});
}

// compare password
exports.comparePassword = function(password, hash) {
 	return new Promise(function(resolve, reject) {
 		bcrypt.compare(password, hash, function(err, res) {
	 	    if (err) {
	 	    	reject(err);
	 	    } else {
	 	    	resolve(res);
	 	    }
	 	});
 	});
}

// Destroy model
// - model is name of model (string)
// - id is the id of the model to be destroyed
exports.destroy = function(model, id) {
	return new Promise(function(resolve, reject) {
		db.get().query('DELETE FROM '+model+' WHERE ID=?;', 
			[id], 
			function(err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
	});
}

// Update model 
// - model is name of model (string)
// - values is ordered set of values to update (should include model id last)
// - valueNames is array containing the names of the values to be inserted
// (not including id)
exports.update = function(model, values, id) {
	return new Promise(function(resolve, reject) {
		db.get().query('UPDATE '+model+' SET ? WHERE ID=?', [values, id], function(err, results, fields) {
				if (err) {
					reject(err);
				} else {
					resolve({results, fields});
				}
		});
	});
}

// Lookup model to pass to other functions
// - model is name of model (string)
// - id is id of model (int)
exports.lookup = function(model, id) {
	return new Promise(function(resolve, reject) {
		db.get().query('SELECT * FROM '+model+' WHERE ID=?;', [id],
			function(err, results, fields) {
				if (err) {
					reject(err);
				} else {
					resolve({results, fields});
				}
			});
	});
}

// Retrieve model by values instead of ID
exports.retrieveByValues = function(model, values, valueNames) {
	return new Promise(function(resolve, reject) {
		var query = 'SELECT * FROM '+model+' WHERE';
		query += fieldQueries(valueNames,1);
		db.get().query(query, values, function(err, results, fields) {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
			});
	});
}

// Retrieve user specified by userID in params
exports.retrieve = function(model, id) {
	return new Promise(function(resolve, reject) {
		db.get().query('SELECT * FROM '+model+' WHERE ID=?;', 
			[id],
			function(err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
	});
}

// Retrieve model values, where model is specified by identifier
exports.lookupByValue = function(model, identifier, value) {
	return new Promise(function(resolve, reject) {
		db.get().query('SELECT * FROM ' + model + ' WHERE ' + identifier + ' = ?;',
			[value], 
			function (err, rows) {
				console.log("abstract err:", err);
				console.log("abstract rows", rows);
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
		});
	});
}

// List all models
// - model is name of model (string)
exports.list = function(model) {
	return new Promise(function(resolve, reject) {
		db.get().query('SELECT * FROM '+model+';', function (err, models) {
			if (err) {
				reject(err);
			} else {
				resolve(models);
			}
		});
	});
}

// Counts the number of models
// - model is name of model (string)
exports.count = function(model) {	
	return new Promise(function(fulfill, reject) {
		db.get().query('SELECT COUNT(ID) AS count FROM '+model+';', function(err,results,fields) {			
			if (err) { reject(err); }
			if (results.length > 0) {
				fulfill(results[0].count);
			}
		});	
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
exports.listByForeignKey = function(model, fk, id) {
	return new Promise(function(resolve, reject) {
		db.get().query('SELECT * FROM '+model+' WHERE '+fk+'=?', [id], 
			function(err, results, fields) {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
			});
	});
}

// Function to call when returning data or error in NON Http response
// - err is error (if any) 
// - data is data to return
// - toCall is function to call
function noHttpResponse(err,data,toCall) {
	if (err) { toCall(err); }
	else { toCall(null, data); }
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

// Check if email invalid. 
// If not, send 500 error and error response
exports.isEmailValid = function (email,res) {
	if (!emailRegex({exact: true}).test(email)) {
        res.status(422).send({error: 'Please provide a valid email'})
        return false;
    }
    return true;
}

exports.noHttpResponse = noHttpResponse;
exports.httpResponse = httpResponse;



