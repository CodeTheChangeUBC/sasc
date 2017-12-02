const passport = require('passport');
const Abstract = require('../models/abstract');
const User = require('../models/user');
const Counsellor = require('../models/counsellor');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptionsUser = { 
    usernameField: 'username',
    session: false
};

const localOptionsCounsellor = {
    usernameField: 'email',
    session: false
}

const localLoginUser = new LocalStrategy(localOptionsUser, function(username, password, done) {
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

const localLoginCounsellor = new LocalStrategy(localOptionsCounsellor, function(email, password, done) {
    
    Counsellor.lookupByEmail(email, function(err, counsellor) {
        if (err) { return done(err); }
        if (!counsellor) { return done(null, false); }

        Abstract.comparePassword(password, counsellor.password, function(err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false); }

            return done(null, counsellor);
        });
    });
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const jwtLoginUser = new JwtStrategy(jwtOptions, function(payload, done) {
    // lookup user by user id from payload subject
    // and return the user object if found
    // or false if not found
    if (payload.role === "user") {
        User.lookupById(payload.sub, function(err, user) {
            if (err) { return done(err, false); }

            if (user) { return done(null, user); } 

            else { return done(null, false); }
        });
    }

    else { return done(null, false); }
});

const jwtLoginCounsellor = new JwtStrategy(jwtOptions, function(payload, done) {

    if (payload.role === "counsellor") {
        Counsellor.lookupById(payload.sub, function(err, counsellor) {
            if (err) { return done(err, false); }

            if (counsellor) { return done(null, counsellor); } 

            else { return done(null, false); }
        });
    }

    else { return done(null, false); }
});

passport.use("jwt-user", jwtLoginUser);
passport.use("jwt-counsellor", jwtLoginCounsellor);
passport.use("local-user", localLoginUser);
passport.use("local-counsellor", localLoginCounsellor);