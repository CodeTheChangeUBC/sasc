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

    if (!username || !password) {
        return res.status(422).send({ error: 'You must provide username and password' });
    }

    // Check if user with this username already exists
    User.lookupByUsername(function(err, existingUser) {
        if (err) { return next(err) };


        // If a user with the username already exists, return an error
        if (existingUser) {
            return res.status(422).send({ error: 'Username is in use' });
        }

        User.create(function(err) {
            if (err) { return next(err); }

            // Send token back to client
            res.json({ token: tokenForUser(user) });
        });

    });

}