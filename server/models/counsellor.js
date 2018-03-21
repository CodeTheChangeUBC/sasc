const db = require('../db');
const abstract = require('./abstract');
const to = require("await-to-js").to;

// Create counsellor from post request
exports.create = function(values) {
	return new Promise(async function(resolve, reject) {
		let err, results;
		values['email'] = values['email'].toLowerCase();
		[err, results] = await to(abstract.create('counsellor', values));
		if (err) {
			reject(err);
		} else {
			resolve(results);
		}
	});
}

// Update counsellor
// values is object countaining values to be updated
// id is id of counsellor being updated
exports.update = function(values, id) {
	return new Promise(async function(resolve, reject) {
		let err, results;
		[err, results] = await to(abstract.update('counsellor', values, id));
		if (err) {
			reject(err);
		} else {
			resolve(results);
		}
	});
}

// list all counsellors
exports.list = function(values) {
	return new Promise(async function(resolve, reject) {
		let err, models;
		[err, models] = await to(abstract.list('counsellor'));
		if (err) {
			reject(err);
		} else {
			resolve(models);
		}
	});
}

// retrieve single counsellor 
exports.retrieve = function(values) {
	return new Promise(async function(resolve, reject) {
		let err, result;
		[err, result] = await to(abstract.retrieve('counsellor', req.params.counsellorId));
		if (err) {
			reject(err);
		} else {
			resolve(result);
		}
	});
}

// Retrieve counsellor by values
exports.retrieveByValues = function(values) {
	return new Promise(async function(resolve, reject) {
		let err, results;
		[err, results] = await to(abstract.retrieveByValues('counsellor', values));
		if (err) {
			reject(err);
		} else {
			resolve(results);
		}
	});
}

// Lookup counsellor by email
exports.lookupByCredential = function(email) {
	return new Promise(async function(resolve, reject) {
		let err, rows;
		[err, rows] = await to(abstract.lookupByValue('counsellor', 'email', email));
		if (err) {
			reject(err);
		} else {
			resolve(rows);
		}
	});
}

// Retrieve user by id
exports.lookupById = function(id) {
	return new Promise(async function(resolve, reject) {
		let err, rows;
		[err, rows] = await to(abstract.lookupByValue('counsellor', 'ID', id));
		if (err) {
			reject(err);
		} else {
			resolve(rows);
		}
	});
}

// destroy given counsellor
exports.destroy = function(id) {
	return new Promise(async function(resolve, reject) {
		let err, result;
		[err, result] = await to(abstract.destroy('counsellor', id));
		if (err) {
			reject(err);
		} else {
			resolve(result);
		}
	});
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





