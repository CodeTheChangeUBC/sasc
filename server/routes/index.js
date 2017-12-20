const express = require('express');
const router = express.Router();

const sessionController = require('./../controllers/session');

const authentication = require('./../controllers/authentication');
const passportService = require('./../services/passport');
const passport = require('passport');

const requireAuthUser = passport.authenticate('jwt-user', {session: false});
const requireAuthCounsellor = passport.authenticate('jwt-counsellor', {session: false});
const requireSigninUser = passport.authenticate('local-user', {session: false});
const requireSigninCounsellor = passport.authenticate('local-counsellor', {session: false});

module.exports = function(app) {
    app.get('/counselloronly', function(req, res) {
        res.send({ hello: 'world' });
    });
    app.get('/useronly', requireAuthUser, function(req, res) {
        res.send({ name: 'Kyuubimon'});
    });
    app.post('/signincounsellor', requireSigninCounsellor, authentication.signinCounsellor);
    app.post('/signin', requireSigninUser, authentication.signin);
    app.post('/signup', authentication.signup);
    app.post('/signupcounsellor', authentication.signupCounsellor);
    app.post('/checkrole', authentication.decodeTokenToCheckRole);

}
