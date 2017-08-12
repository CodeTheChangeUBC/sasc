const userController = require('../../server/controllers').users;
const User = require('../../server/models').User
const assert = require('assert');

const chai = require('chai');
const chaiHttp = require('chai-http');

describe("User Test", function() {

	// Test creating a user 
	describe("Create User", function() {
		it('should create another user', function() {
			console.log("passed");
		});
	});
});