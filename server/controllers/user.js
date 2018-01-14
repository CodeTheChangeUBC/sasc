const Abstract = require("../models/abstract");
const userModel = require("../models/user");

exports.submitSurvey = function (req, res) {
    var user = {
        nickname: req.body.nickname,
        age: req.body.age,
        gender: req.body.gender,
        email: req.body.email,
        registered: 0
    };

    // TODO: Add email regex check here
    // If email passes regex check, the function can continue
    // else, send a response to the frontend.

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