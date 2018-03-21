const counsellorModel = require("../models/counsellor");
const helper = require("./helper");
const to = require("await-to-js").to;

exports.getCounsellor = async function (req, res) {
    account.getAccount("counsellor", counsellorModel, req, res);
};

exports.updateCounsellor = async function (req, res) {
    var id = req.query.counsellorId;

    var counsellor = {
        firstName: req.body.firstName.trim(),
        lastName: req.body.lastName.trim(),
        email: req.body.email.trim()
    };

    if (helper.checkBlankRequiredFields(counsellor)) {
        return res.status(422).send({error: "You must enter all fields."});
    }

    account.updateAccount("counsellor", counsellorModel, counsellor, id, req, res);
};

exports.changePassword = function (req, res) {
    var id = req.query.counsellorId;
    account.changePassword(req, res, counsellorModel, id);
}