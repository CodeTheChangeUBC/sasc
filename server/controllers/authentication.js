const jwt = require("jwt-simple");
const Abstract = require("../models/abstract");
const userModel = require("../models/user");
const counsellorModel = require("../models/counsellor");
const config = require("../../config");

function tokenForUser(user, role) {
    const timestamp = Date.now();                         // in milliseconds
    const expiry = (Date.now() + 60.0 * 60.0 * 1000.0) / 1000.0;    // An hour from now (in seconds)
    return jwt.encode({sub: user.ID, iat: timestamp, exp: expiry, role: role}, config.secret2);
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

    // Check if user with their corresponding identifier already exists
    lookupUser(usernameCredential, function (err, users) {

        if (err) {
            return res.status(422).send({error: "Cannot look up user."});
        }

        // If a user with the identifier already exists, return an error
        if (users[0] !== undefined && users[0] !== null) {
            return res.status(422).send({error: usernameCredential + " is in use."});
        }

        encryptPassword(user, function (result) {
            user = result;

            create(user, function (err) {
                if (err) {
                    return res.status(422).send({error: "Cannot create " + role + "."});
                }

                // lookup user to get the ID, which is needed to generate a token
                lookupUser(usernameCredential, function (err, users) {
                    if (err) {
                        return res.status(422).send({error: "Cannot look up user."});
                    }

                    // If there aren't any users, send error
                    if (users[0] === undefined || users[0] === null) {
                        return res.status(422).send({error: role.charAt(0).toUpperCase() + role.slice(1) + " does not exist."});
                    }

                    // Send token back to client
                    res.json({token: tokenForUser(user, role)});
                });

            });

        });

    });
};

exports.decodeTokenToCheckRole = function (req, res) {
    try {
        const tokenContents = jwt.decode(req.body.token, config.secret2);
        const role = tokenContents.role;
        res.send({role: role});
    } catch (e) {
        res.send({role: "none"});
    }
}

exports.signup = function (req, res) {
    var user = {
        username: req.body.username.trim(),
        password: req.body.password,
        age: req.body.age.trim(),
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber.trim(),
        email: req.body.email.trim(),
        registered: 1
    };

    var requiredCredentials = {
        username: req.body.username.trim(),
        password: req.body.password,
        email: req.body.email.trim()
    };

    abstractSignup(user, requiredCredentials, "user", res, userModel.lookupByUsername, Abstract.process, userModel.create);
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
        firstName: req.body.firstName.trim(),
        lastName: req.body.lastName.trim(),
        email: req.body.email.trim(),
        password: req.body.password
    };

    var requiredCredentials = {
        email: req.body.email.trim(),
        password: req.body.password
    };

    abstractSignup(counsellor, requiredCredentials, "counsellor", res, counsellorModel.lookupByEmail, Abstract.process, counsellorModel.create);
};
