const Abstract = require("../models/abstract");
const userModel = require("../models/user");
const account = require("./account");
const helper = require("./helper");
const isEmailValid = require("../models/abstract").isEmailValid;
const to = require("await-to-js").to;

exports.submitSurvey = async function (req, res) {
    var user = {
        nickname: req.body.nickname.trim(),
        age: req.body.age,
        gender: req.body.gender.trim(),
        email: req.body.email.trim(),
        registered: 0
    };

    if (helper.checkBlankRequiredFields(user)) {
        return res.status(422).send({error: "You must enter all fields."});
    }

    // Check if email is valid
    if (!isEmailValid(user.email, res)) {
        return;
    }

    var err, results;
    err, results = await to(userModel.create(user));
    
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

};

exports.getUser = async function (req, res) {
    account.getAccount("user", userModel, req, res);
};

exports.updateUser = async function (req, res) {
    var id = req.query.userId;

    var user = {
        nickname: req.body.nickname.trim(),
        age: req.body.age,
        gender: req.body.gender.trim(),
        email: req.body.email.trim()
    };

    if (helper.checkBlankRequiredFields(user)) {
        return res.status(422).send({error: "You must enter all fields."});
    }

    account.updateAccount("user", userModel, user, id, req, res);
};

exports.changePassword = function (req, res) {
    console.log(id);
    console.log(req.body);
    account.changePassword(req, res, userModel);
}