const express = require('express');
const router = express.Router();

const Authentication = require('./authentication');
const passportService = require('../services/passport');
const passport = require('passport');

//const requireAuth = passport.authenticate('jwt', { session: false });
//const requireSignin = passport.authenticate('local', { session: false });

const Abstract = require('../models/abstract');
const User = require('../models/user');

module.exports = function(app) {
    //app.get('/sms', requireAuth, function(req, res) {
        res.send({ hello: 'world' });
    });
    //app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
}

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;*/
