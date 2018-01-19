const Abstract = require("../models/abstract");
const counsellorModel = require("../models/counsellor");
const helper = require("./helper");

exports.getCounsellor = function (req, res) {
    var id = req.params.ID;

    counsellorModel.lookupById(id, function (err, results) {
        if (err) {
            return res.status(422).send({error: "Failed to lookup counsellor account information."});
        }

        if (results.length === 0) {
            return res.status(422).send({error: "No such counsellor."});
        }

        var counsellor = results[0];
        return res.status(201).send({counsellor: counsellor});
    });
};

exports.updateCounsellor = function (req, res) {
    var id = req.params.ID;

    var counsellor = {
        firstName: req.body.nickname.trim(),
        lastName: req.body.password,
        email: req.body.email.trim()
    };

    if (helper.checkBlankRequiredFields(counsellor)) {
        return res.status(422).send({error: "You must enter all fields."});
    }

    // Check entered password before updating user information
    Abstract.process(counsellor, function (result) {
        counsellorModel.lookupById(id, function (err, results) {
            if (err) {
                return res.status(422).send({error: "Failed to lookup counsellor account information."});
            }

            if (results.length === 0) {
                return res.status(422).send({error: "No such counsellor."});
            }

            if (results[0].password !== result.password) {
                return res.status(422).send({error: "The provided password is incorrect."});
            }

            counsellorModel.update(id, counsellor, function (err, results) {
                if (err) {
                    return res.status(422).send({error: "Failed to update counsellor account information."});
                }

                if (!results) {
                    return res.status(422).send({error: "Failed to update counsellor account information."});
                }

                return res.status(201).send({success: "Successfully updated counsellor."});
            });
        });
    });
};

exports.changePassword = function (req, res) {
    var id = req.params.ID;
    var oldPassword = req.body.oldPassword;

    Abstract.hashOne(oldPassword, function (err, oldPasswordHashed) {
        if (err) {
            return res.status(422).send({error: "Failed to encrypt password."});
        }

        if (!oldPasswordHashed) {
            return res.status(422).send({error: "Failed to encrypt password."});
        }

        counsellorModel.lookupById(id, function (err, results) {
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

                var counsellor = {
                    password: newPasswordHashed
                };

                counsellorModel.update(id, counsellor, function (err, results) {
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