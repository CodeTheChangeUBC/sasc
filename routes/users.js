var express = require('express');
var router = express.Router();
const usersController = require('../server/controllers').users;

// Requests for /users 
router.get('/', usersController.list);
router.post('/', usersController.create);
// Get User with id userId 
router.get('/:userId', usersController.retrieve);
// Update user with specified id
router.put('/:userId', usersController.update);
// Delete user with specified id
router.delete('/:userId', usersController.destroy);

module.exports = router;
