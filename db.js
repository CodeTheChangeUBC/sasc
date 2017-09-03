const mysql = require('mysql');
const async = require('async');

// Test and development DBs
const DEV_DB = 'sasc_dev_db';
const TEST_DB = 'sasc_test_db';

// DB modes corresponding to different DBs
exports.MODE_TEST = 'mode_test';
exports.MODE_DEVELOPMENT = 'mode_development';

var state = {
	pool: null,
	mode: null,
}

// Connect to DB
exports.connect = function(mode, done) {
	state.pool = mysql.createPool({
		// Local DB details
		host: '127.0.0.1',
		username: 'sasc',
		password: null,
		database: mode === exports.MODE_DEVELOPMENT ? DEV_DB : TEST_DB
	});

	state.mode = mode;
	done();
}

// Get function for easy access to DB
exports.get = function() {
	return state.pool;
}

// Create fixtures (for testing purposes)
// Data is json object containing test data
exports.fixtures = function(data) {
	var pool = state.pool;
	if (!pool) return done(new Error('Missing database connection'));

	// Parse through data and add each element to db
	var names = Object.keys(data.tables)
	async.each(names, function(name, cb) {
		async.each(data.tables[name], function(row,cb) {
			var keys = Object.keys(row);
			var values = keys.map(function(key) { return "'" + row[key] + "'"});
			pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb);

		}, cb);
	}, done);
}

// Drop all data from tables 
exports.drop = function(tables,done) {
	var pool = state.pool
	if (!pool) return done(new Error('Missing database connection'));
	async.each(tables,function(name,cb) {
		pool.query('DELETE * FROM' + name, cb)
	}, done);
}


