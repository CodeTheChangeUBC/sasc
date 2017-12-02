const jwt = require('jwt-simple');
const Abstract = require('../models/abstract');
const User = require('../models/user');
const Counsellor = require('../models/counsellor');
const config = require('../config');

function tokenForUser(user, role) {
    const timestamp = new Date().getTime();                         // in milliseconds
    const expiry = (new Date().getTime() + 60 * 60 * 1000)/1000;    // An hour from now (in seconds)
    return jwt.encode({ sub: user.ID, iat: timestamp, exp: expiry, role: role }, config.secret);
}

exports.signin = function(req, res) {
    res.send({ token: tokenForUser(req.user, 'user') });
}

exports.signup = function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const age = req.body.age;
    const gender = req.body.gender;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;

    if (!username || !password || !email) {
        return res.status(422).send({ error: 'You must provide all of username, password and email.' });
    }

    // Welcome to callback hell :D
    // Check if user with this username already exists
    User.lookupByUsername(username, function(err, existingUser) {

        if (err) { throw err; }

        // If a user with the username already exists, return an error
        if (existingUser) {
            return res.status(422).send({ error: 'Username is in use' });
        }

        var user = {
            username: username,
            age: age, 
            gender: gender,
            phoneNumber: phoneNumber,
            email: email,
            password: password
        };

        Abstract.process(user, function (result) {
            user = result;
            req.body.password = result.password;

            User.create(user, res, function(err, result) {
                if (err) { return res.status(422).send({ error: 'Cannot create user.'}); }

                User.lookupIdByUsername(username, function(err, result) {
                    if (err) { throw err; }

                    if (!result) { return res.status(422).send({ error: 'Username does not exist.' }); }
                    req.body.ID = result;
                    user.ID = result;
                    
                    // Send token back to client
                    res.json({ token: tokenForUser(user, 'user') });
                });
            
            });
        
        });
    
    });

}

// Authentication for counsellors

exports.signinCounsellor = function(req, res) {
    res.send({ token: tokenForUser(req.user, 'counsellor') });
}

exports.signupCounsellor = function(req, res, next) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    
    if (!email || !password) { return res.status(422).send({ error: 'You must provide email and password.' }); }

    // Check if counsellor with this email already exists
    Counsellor.lookupByEmail(email, function(err, existingCounsellor) {

        if (err) { throw err; }

        // If a counsellor with the email already exists, return an error
        if (existingCounsellor) { return res.status(422).send({ error: 'Email is in use' }); }

        var counsellor = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };

        Abstract.process(counsellor, function (result) {
            counsellor = result;
            req.body.password = result.password;

            Counsellor.create(counsellor, res, function(err, result) {
                if (err) { return res.status(422).send({ error: 'Cannot create counsellor.'}); }

                Counsellor.lookupIdByEmail(email, function(err, result) {
                    if (err) { throw err; }

                    if (!result) { return res.status(422).send({ error: 'Email does not exist.' }); }

                    req.body.ID = result;
                    counsellor.ID = result;
                    
                    // Send token back to client
                    res.json({ token: tokenForUser(counsellor, 'counsellor') });
                });
            
            });
        
        });
    
    });

}