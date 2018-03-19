const passport = require("passport");
const Abstract = require("../models/abstract");
const User = require("../models/user");
const Counsellor = require("../models/counsellor");
const config = require("../../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");
const to = require("await-to-js").to;

const localOptionsUser = {
    usernameField: "username",
    session: false
};

const localOptionsCounsellor = {
    usernameField: "email",
    session: false
};

async function abstractLocalLogin(identifier, password, done, model) {
    // Retrieve user by identifier and compare hashed password
    // from database with the given password hashed
    var err, users, isMatch;
    [err, users] = await to(model.lookupByCredential(identifier));
    
    if (err) {
        return done(err);
    }
    if (users[0] === undefined || users[0] === null) {
        return done(null, false);
    }

    [err, isMatch] = await to(Abstract.comparePassword(password, users[0].password));
    if (err) {
        return done(err);
    }

    if (!isMatch) {
        return done(null, false);
    }

    return done(null, users[0]);
}

async function abstractJwtLogin(payload, done, role, model) {
    // lookup user by user id from payload subject
    // and return the user object if found
    // or false if not found
    if (payload.role === role) {
        var err, users;
        [err, users] = await to(model.lookupById(payload.sub));
        if (err) {
            return done(err, false);
        // If user exists, return user
        } else if (users[0] !== undefined && users[0] !== null) {
            return done(null, users);
        } else {
            return done(null, false);
        }
    } else {
        return done(null, false);
    }
}

const localLoginUser = new LocalStrategy(localOptionsUser, function (username, password, done) {
    abstractLocalLogin(username, password, done, User, Abstract.comparePassword);
});

const localLoginCounsellor = new LocalStrategy(localOptionsCounsellor, function (email, password, done) {
    abstractLocalLogin(email, password, done, Counsellor, Abstract.comparePassword);
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: config.secret
};

const jwtLoginUser = new JwtStrategy(jwtOptions, function (payload, done) {
    abstractJwtLogin(payload, done, "user", User);
});

const jwtLoginCounsellor = new JwtStrategy(jwtOptions, function (payload, done) {
    abstractJwtLogin(payload, done, "counsellor", Counsellor);
});

passport.use("jwt-user", jwtLoginUser);
passport.use("jwt-counsellor", jwtLoginCounsellor);
passport.use("local-user", localLoginUser);
passport.use("local-counsellor", localLoginCounsellor);