const express = require('express');
const router = express.Router();

const Authentication = require('./authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuthUser = passport.authenticate('jwt-user', {session: false});
const requireAuthCounsellor = passport.authenticate('jwt-counsellor', {session: false});
const requireSigninUser = passport.authenticate('local-user', {session: false});
const requireSigninCounsellor = passport.authenticate('local-counsellor', {session: false});


module.exports = function(app) {
    app.get('/sms', function(req, res) {
        res.send({ hello: 'world' });
    });
    app.get('/useronly', requireAuthUser, function(req, res) {
        res.send({ name: 'Kyuubimon'});
    });
    app.post('/signincounsellor', requireSigninCounsellor, Authentication.signinCounsellor);
    app.post('/signin', requireSigninUser, Authentication.signin);
    app.post('/signup', Authentication.signup);
    app.post('/signupcounsellor', Authentication.signupCounsellor);
}
