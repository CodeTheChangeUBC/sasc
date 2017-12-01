const express = require('express');
const router = express.Router();

const Authentication = require('./authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuthUser = passport.authenticate('jwt-user', { session: false });
const requireAuthCounsellor = passport.authenticate('jwt-counsellor', { session: false });
const requireSigninUser = passport.authenticate('local-user', { session: false });
const requireSigninCounsellor = passport.authenticate('local-counsellor', { session: false });

const Abstract = require('../models/abstract');
const User = require('../models/user');

module.exports = function(app) {
    app.get('/sms', requireAuthCounsellor, function(req, res) {
        res.send({ hello: 'world' });
    });
    app.get('/useronly', requireAuthUser, function(req, res) {
        res.send({ no: 'counsellors allowed'});
    });
    app.post('/signinCounsellor', requireSigninCounsellor, Authentication.signinCounsellor);
    app.post('/signin', requireSigninUser, Authentication.signin);
    app.post('/signup', Authentication.signup);
    app.post('/signupcounsellor', Authentication.signupCounsellor);
}

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;*/
