const Abstract = require("../models/abstract");
const userModel = require("../models/user");
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
    var id = req.query.userId;
    var err, results;
    [err, results] = await to(userModel.lookupById(id));
    
    if (err) {
        return res.status(422).send({error: "Failed to lookup user account information."});
    }

    if (results.length === 0) {
        return res.status(422).send({error: "No such user."});
    }

    var user = results[0];
    if (user.password) {
        delete user.password;
    }

    return res.status(201).send({user: user});
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

    // Check entered password before updating user information
    var err, result;
    [err, result] = await to(Abstract.process(user));
    userModel.lookupById(id);
    if (err) {
        return res.status(422).send({error: "Failed to lookup user account information."});
    }

    if (results.length === 0) {
        return res.status(422).send({error: "No such user."});
    }

    console.log(results[0].password);
    console.log(result.password);
    if (results[0].password !== result.password) {
        return res.status(422).send({error: "The provided password is incorrect."});
    }

    var results, fields;
    [err, results, fields] = await to(userModel.update(id, user));
    if (err) {
        return res.status(422).send({error: "Failed to update user account information."});
    }

    if (!results) {
        return res.status(422).send({error: "Failed to update user account information."});
    }

    return res.status(201).send({success: "Successfully updated user."});
};