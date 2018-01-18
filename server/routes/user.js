var express = require('express');
var router = express.Router();
const passport = require('passport');
const userController = require("./../controllers/user");

const requireAuthUser = passport.authenticate('jwt-user', {session: false});
const requireAuthCounsellor = passport.authenticate('jwt-counsellor', {session: false});

router.get('/:userId', userController.getUser);

router.post('/surveys', userController.submitSurvey);

router.put('/password/:userId', requireAuthUser, userController.changePassword);

module.exports = router;
