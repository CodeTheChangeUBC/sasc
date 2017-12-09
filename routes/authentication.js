const jwt = require("jwt-simple");
const Abstract = require("../models/abstract");
const User = require("../models/user");
const Counsellor = require("../models/counsellor");
const config = require("../config");

function tokenForUser(user, role) {
    const timestamp = Date.now();                         // in milliseconds
    const expiry = (Date.now() + 60 * 60 * 1000) / 1000;    // An hour from now (in seconds)
    return jwt.encode({sub: user.ID, iat: timestamp, exp: expiry, role: role}, config.secret);
}

function convertToSentence(listOfNouns) {
    const len = listOfNouns.length;
    var str = "";
    listOfNouns.forEach(function (ignore, i) {
        if (i === 1) {
            // First word
            str += listOfNouns[i];
        } else if (i === len - 1) {
            // Last word
            str += ", and " + listOfNouns[i];
        } else {
            // In the middle of the list of words
            str += ", " + listOfNouns[i];
        }

    });

    return str;
}

function abstractSignup(user, requiredCredentials, role, res, lookupUser, encryptPassword, create) {

    var error = false;
    var missingCredentials = [];

    Object.keys(requiredCredentials).forEach(function (property) {
        if (!requiredCredentials[property]) {
            error = true;
            missingCredentials.push(requiredCredentials[property]);
        }
    });

    if (error) {
        return res.status(422).send({error: "You must provide all of " + convertToSentence(missingCredentials) + "."});
    }

    var usernameCredential = requiredCredentials[Object.keys(requiredCredentials)[0]];

    // Welcome to callback hell :D
    // I think promises might be better
    // Check if user with their corresponding identifier already exists
    lookupUser(usernameCredential, function (err, existingUser) {

        if (err) {
            throw err;
        }

        // If a user with the identifier already exists, return an error
        if (existingUser) {
            return res.status(422).send({error: usernameCredential.charAt(0).toUpperCase() + " is in use."});
        }

        encryptPassword(user, function (result) {
            user = result;

            create(user, function (err) {
                if (err) {
                    return res.status(422).send({error: "Cannot create " + role + "."});
                }

                // lookup user to get the ID, which is needed to generate a token
                lookupUser(usernameCredential, function (err, user) {
                    if (err) {
                        throw err;
                    }

                    if (!user) {
                        return res.status(422).send({error: role.charAt(0).toUpperCase() + " does not exist."});
                    }

                    // Send token back to client
                    res.json({token: tokenForUser(user, role)});
                });

            });

        });

    });
}

exports.signup = function (req, res) {
    var user = {
        username: req.body.username,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    };

    var requiredCredentials = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    };

    abstractSignup(user, requiredCredentials, "user", res, User.lookupByUsername, Abstract.process, User.create);
};

exports.signin = function (req, res) {
    res.send({token: tokenForUser(req.user, "user")});
};

// Authentication for counsellors
exports.signinCounsellor = function (req, res) {
    res.send({token: tokenForUser(req.user, "counsellor")});
};

exports.signupCounsellor = function (req, res) {

    var counsellor = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };

    var requiredCredentials = {
        email: req.body.email,
        password: req.body.password
    };

    abstractSignup(counsellor, requiredCredentials, "counsellor", res, Counsellor.lookupByEmail, Abstract.process, Counsellor.create);

};