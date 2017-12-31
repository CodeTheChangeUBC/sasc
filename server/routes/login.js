var student = require('../controllers/users')
// var counsellor = require('../controllers/counsellors')

var secrets = require('../socket_server/secrets')
var jwt = require('jsonwebtoken')

var router = require('express').Router()

router.prefix('/login')


// CONSIDER WRITING AND ABSTRACTION FOR THESE TWO.

router.get('/student', (req, res) => {
    student
    .retrieve(req,res)
    .then(user => {
        // Since this is good make a token, and send it back.
        jwt
        .sign({
            data: user,
            exp: secrets.time
        }, 
        secrets.secret,
        (err, data) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.send(data);
        })
    })
    .catch(error => {
        res.status(400).send(error);
    })
})

router.get('/counsellor', (req, res) => {
    counsellor
    .retrieve(req,res)
    .then(user => {
        // Since this is good make a token, and send it back.
        jwt
        .sign({
            data: user,
            exp: secrets.time
        }, 
        secrets.secret,
        (err, data) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.send(data);
        })
    })
    .catch(error => {
        res.status(400).send(error);
    })
})

module.exports = router;






