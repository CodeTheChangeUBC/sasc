const passport = require('passport');
const Abstract = require('../models/abstract');
const User = require('../models/user');
const Counsellor = require('../models/counsellor');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = { 
    usernameField: 'username',
    roleField: 'role',
    session: false
};

const localLogin = new LocalStrategy(localOptions, function(username, password, role, done) {
    // Retrieve user by username and compare hashed password
    // from database with the given password hashed
    User.lookupByUsername(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }

        Abstract.comparePassword(password, user.password, function(err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false); }

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
    if (payload.role === "user") {
        User.lookupById(payload.sub, function(err, user) {
            if (err) { return done(err, false); }

            if (user) { done(null, user); } 

            else { done(null, false); }
        });
    } else if (payload.role === "counsellor") {
        Counsellor.lookupById(payload.sub, function(err, counsellor) {
            if (err) { return done(err, false); }

            if (counsellor) { done(null, counsellor); } 

            else { done(null, false); }
        });
    }  
});

passport.use(jwtLogin);
passport.use(localLogin);