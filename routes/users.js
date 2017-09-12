var express = require('express');
var router = express.Router();
const User = require('../models').user;

// Requests for /users 
router.get('/', User.list);
router.post('/', User.create);
// // Get User with id userId 
// router.get('/:userId', usersController.retrieve);
// // Update user with specified id
// router.put('/:userId', usersController.update);
// // Delete user with specified id
// router.delete('/:userId', usersController.destroy);

module.exports = router;
