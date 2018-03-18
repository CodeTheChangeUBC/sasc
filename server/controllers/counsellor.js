const helper = require("./helper");
const to = require("await-to-js").to;

exports.getCounsellor = async function (req, res) {
    var id = req.params.ID;
    var err, results;

    [err, results] = await to(counsellorModel.lookupById(id));
    if (err) {
        return res.status(422).send({error: "Failed to lookup counsellor account information."});
    }

    if (results.length === 0) {
        return res.status(422).send({error: "No such counsellor."});
    }

    var counsellor = results[0];
    return res.status(201).send({counsellor: counsellor});
};

exports.updateCounsellor = async function (req, res) {
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
    var err, results;
    [err, results] = await to(Abstract.process(counsellor));
    [err, results] = await to(counsellorModel.lookupById(id));
    if (err) {
        return res.status(422).send({error: "Failed to lookup counsellor account information."});
    }

    if (results.length === 0) {
        return res.status(422).send({error: "No such counsellor."});
    }

    if (results[0].password !== result.password) {
        return res.status(422).send({error: "The provided password is incorrect."});
    }

    [err, results] = await to(counsellorModel.update(id, counsellor));
    if (err) {
        return res.status(422).send({error: "Failed to update counsellor account information."});
    }

    if (!results) {
        return res.status(422).send({error: "Failed to update counsellor account information."});
    }

    return res.status(201).send({success: "Successfully updated counsellor."});
};
