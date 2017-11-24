const passport = require('passport');
const Abstract = require('../models/abstract');
const User = require('../models/user');
const Counsellor = require('../models/counsellor');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'username' };
const localLogin = new LocalStrategy(localOptions, function(username, password, done) {
    // Retrieve user by username and compare hashed password
    // from database with the given password hashed
    User.lookupByUsername(username, function(err, user) {
        if (err) { console.log("error"); return done(err); }
        if (!user) { console.log("user doesn't exist"); return done(null, false); }

        Abstract.comparePassword(password, user.password, function(err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch) { console.log("password doesn't match"); return done(null, false); }

            return done(null, user);
        });

    });
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // lookup user by user id from payload subject
    // and return the user object if found
    // or false if not found
    User.lookupById(payload.sub, function(err, user) {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

passport.use(jwtLogin);
passport.use(localLogin);