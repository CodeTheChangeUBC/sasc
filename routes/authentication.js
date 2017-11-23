const jwt = require('jwt-simple');
const Abstract = require('../models/abstract');
const User = require('../models/user');
const Counsellor = require('../models/counsellor');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.ID, iat: timestamp }, config.secret);
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

                User.lookupByUsername(req, res, function(err, result) {
                    if (err) { throw err; }

                    if (!result) { res.status(422).send({ error: 'Username does not exist.' }); }

                    req.body.ID = result.ID;
                    user.ID = result.ID;
                    
                    // Send token back to client
                    res.json({ token: tokenForUser(user) });
                });
            
            });
        
        });
    
    });

}