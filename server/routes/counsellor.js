var express = require('express');
var router = express.Router();
const counsellorController = require("./../controllers/counsellor");
const accountController = require("./../controllers/account");
const passport = require('passport');
const requireAuthCounsellor = passport.authenticate('jwt-counsellor', {session: false});

//router.get('/:counsellorId', userController.getCounsellor);
router.put('/password/:userId', requireAuthCounsellor, accountController.changePasswordCounsellor);

module.exports = router;
