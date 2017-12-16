const passport = require("passport");
const Abstract = require("../models/abstract");
const User = require("../models/user");
const Counsellor = require("../models/counsellor");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

const localOptionsUser = {
    usernameField: "username",
    session: false
};

const localOptionsCounsellor = {
    usernameField: "email",
    session: false
};

function abstractLocalLogin(identifier, password, done, lookupUser, verifyPassword) {
    // Retrieve user by identifier and compare hashed password
    // from database with the given password hashed
    lookupUser(identifier, function (err, users) {
        if (err) {
            return done(err);
        }

        if (users[0] === undefined || users[0] === null) {
            return done(null, false);
        }

        verifyPassword(password, users[0].password, function (err, isMatch) {
            if (err) {
                return done(err);
            }

            if (!isMatch) {
                return done(null, false);
            }

            return done(null, users[0]);
        });

    });
}

function abstractJwtLogin(payload, done, role, lookupById) {
    // lookup user by user id from payload subject
    // and return the user object if found
    // or false if not found
    if (payload.role === role) {
        lookupById(payload.sub, function (err, users) {
            if (err) {
                return done(err, false);
            // If user exists, return user
            } else if (users[0] !== undefined && users[0] !== null) {
                return done(null, users);
            } else {
                return done(null, false);
            }
        });
    } else {
        return done(null, false);
    }
}

const localLoginUser = new LocalStrategy(localOptionsUser, function (username, password, done) {
    abstractLocalLogin(username, password, done, User.lookupByUsername, Abstract.comparePassword);
});

const localLoginCounsellor = new LocalStrategy(localOptionsCounsellor, function (email, password, done) {
    abstractLocalLogin(email, password, done, Counsellor.lookupByEmail, Abstract.comparePassword);
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: config.secret
};

const jwtLoginUser = new JwtStrategy(jwtOptions, function (payload, done) {
    abstractJwtLogin(payload, done, "user", User.lookupById);
});

const jwtLoginCounsellor = new JwtStrategy(jwtOptions, function (payload, done) {
    abstractJwtLogin(payload, done, "counsellor", Counsellor.lookupById);
});

passport.use("jwt-user", jwtLoginUser);
passport.use("jwt-counsellor", jwtLoginCounsellor);
passport.use("local-user", localLoginUser);
passport.use("local-counsellor", localLoginCounsellor);