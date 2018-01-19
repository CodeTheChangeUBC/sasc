const Abstract = require("../models/abstract");
const userModel = require("../models/user");
const isEmailValid = require('../models/abstract').isEmailValid

exports.submitSurvey = function (req, res) {
    var user = {
        nickname: req.body.nickname,
        age: req.body.age,
        gender: req.body.gender,
        email: req.body.email,
        registered: 0
    };

    // Check if email is valid
    if (!isEmailValid(email, res)) return;

    userModel.create(user, function (err, results) {
        if (err) {
            return res.status(422).send({error: "Failed to submit survey."});
        }

        if (!results) {
            return res.status(422).send({error: "Failed to submit survey."});
        }

        return res.status(201).send({
            success: "Survey successfully submitted.",
            userid: results.insertId
        });
    });
};

exports.getUser = function (req, res) {
    var id = req.body.ID;

    userModel.lookupById(id, function (err, results) {
        if (err) {
            return res.status(422).send({error: "Failed to lookup user account information."});
        }

        if (results.length === 0) {
            return res.status(422).send({error: "No such user."});
        }

        var user = results[0];
        return res.status(201).send({user: user});
    });
};

exports.updateUser = function (req, res) {
    var id = req.body.ID;

    var user = {
        nickname: req.body.nickname,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
        email: req.body.email
    };

    // Check entered password before updating user information
    Abstract.process(user, function (result) {
        userModel.lookupById(id, function (err, results) {
            if (err) {
                return res.status(422).send({error: "Failed to lookup user account information."});
            }

            if (results.length === 0) {
                return res.status(422).send({error: "No such user."});
            }

            if (results[0].password !== result.password) {
                return res.status(422).send({error: "The provided password is incorrect."});
            }

            userModel.update(id, user, function (err, results) {
                if (err) {
                    return res.status(422).send({error: "Failed to update user account information."});
                }

                if (!results) {
                    return res.status(422).send({error: "Failed to update user account information."});
                }

                return res.status(201).send({success: "Successfully updated user."});
            });
        });
    });
};

exports.changePassword = function (req, res) {
    var id = req.body.ID;
    var oldPassword = req.body.oldPassword;

    Abstract.hashOne(oldPassword, function (err, oldPasswordHashed) {
        if (err) {
            return res.status(422).send({error: "Failed to encrypt password."});
        }

        if (!oldPasswordHashed) {
            return res.status(422).send({error: "Failed to encrypt password."});
        }

        userModel.lookupById(id, function (err, results) {
            if (err) {
                return res.status(422).send({error: "Failed to lookup user account information."});
            }

            if (results.length === 0) {
                return res.status(422).send({error: "No such user."});
            }

            if (results[0].password !== oldPasswordHashed) {
                return res.status(422).send({error: "The provided password is incorrect."});
            }

            var newPassword = req.body.newPassword;

            Abstract.hashOne(newPassword, function (err, newPasswordHashed) {
                if (err) {
                    return res.status(422).send({error: "Failed to encrypt password."});
                }

                if (!newPasswordHashed) {
                    return res.status(422).send({error: "Failed to encrypt password."});
                }

                var user = {
                    password: newPasswordHashed
                };

                userModel.update(id, user, function (err, results) {
                    if (err) {
                        return res.status(422).send({error: "Failed to change password."});
                    }

                    if (!results) {
                        return res.status(422).send({error: "Failed to change password."});
                    }

                    return res.status(201).send({success: "Successfully changed password."});
                });
            });
        });
    });
};