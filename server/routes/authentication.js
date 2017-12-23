var express = require('express');
var router = express.Router();

const authentication = require('./../controllers/authentication');
const passportService = require('./../services/passport');
const passport = require('passport');

const requireAuthUser = passport.authenticate('jwt-user', {session: false});
const requireAuthCounsellor = passport.authenticate('jwt-counsellor', {session: false});
const requireSigninUser = passport.authenticate('local-user', {session: false});
const requireSigninCounsellor = passport.authenticate('local-counsellor', {session: false});

router.post('/signincounsellor', requireSigninCounsellor, authentication.signinCounsellor);
router.post('/signin', requireSigninUser, authentication.signin);
router.post('/signup', authentication.signup);
router.post('/signupcounsellor', authentication.signupCounsellor);
router.post('/checkrole', authentication.decodeTokenToCheckRole);

// For testing purposes only
router.get('/counselloronly', requireAuthCounsellor, function(req, res) {
    res.send({ hello: 'world' });
});
router.get('/useronly', requireAuthUser, function(req, res) {
    res.send({ name: 'Kyuubimon'});
});

module.exports = router;