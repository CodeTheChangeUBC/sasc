var express = require('express');
var router = express.Router();
const counsellorController = require("./../controllers/counsellor");
const passport = require('passport');
const requireAuthCounsellor = passport.authenticate('jwt-counsellor', {session: false});

router.get('/', counsellorController.getCounsellor);
router.put('/', counsellorController.updateCounsellor);
router.put('/password', requireAuthCounsellor, counsellorController.changePassword);

module.exports = router;
