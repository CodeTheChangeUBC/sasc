const jwt = require('jwt-simple');
const Abstract = require('../models/abstract');
const User = require('../models/user');
const Counsellor = require('../models/counsellor');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.ID, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
    // User has already had their email and password auth'd
    // We just need to give them a token
    res.send({ token: tokenForUser(req.user) });
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
    User.lookupByUsername(req, res, function(err, existingUser) {

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

            User.create(req, res, function(err, result) {
                if (err) { res.status(422).send({ error: 'Cannot create user.'}); }

                User.lookupIdByUsername(req, res, function(err, result) {
                    if (err) { throw err; }

                    if (!result) { res.status(422).send({ error: 'Username does not exist.' }); }
                    req.body.ID = result;
                    user.ID = result;
                    
                    // Send token back to client
                    res.json({ token: tokenForUser(user) });
                });
            
            });
        
        });
    
    });

}