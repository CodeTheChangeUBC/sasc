var express = require('express');
var router = express.Router();
const userModel = require('./../models').user;
const userController = require("./../controllers/user");

const requireAuthUser = passport.authenticate('jwt-user', {session: false});
const requireAuthCounsellor = passport.authenticate('jwt-counsellor', {session: false});

// Requests for /users 
router.get('/', userModel.list);
router.post('/', userModel.create);
// Get user with id userId 
router.get('/:userId', userModel.retrieve);
// Update user with specified id
router.put('/:userId', userModel.lookup, userModel.update);
// Delete user with specified id
router.delete('/:userId', userModel.lookup, userModel.destroy);

router.delete('/', userModel.destroyAll);

router.post('/surveys', userController.submitSurvey);

router.put('/password/:userId', requireAuthUser, userController.changePassword);

module.exports = router;
