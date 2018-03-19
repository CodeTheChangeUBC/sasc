var express = require('express');
var router = express.Router();
const passport = require('passport');
const userController = require("./../controllers/user");
const accountController = require("./../controllers/account");

const requireAuthUser = passport.authenticate('jwt-user', {session: false});

router.get('/', userController.getUser);

router.put('/', userController.updateUser);

router.post('/surveys', userController.submitSurvey);

router.put('/password/:userId', requireAuthUser, accountController.changePasswordUser);

module.exports = router;
