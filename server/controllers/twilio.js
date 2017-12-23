const twilioModel = require("../models/twilio");

exports.addTwilioAccountInfo = function (req, res) {
    var twilio = {
        email: req.body.email,
        twilioPhoneNumber: req.body.twilioPhoneNumber,
        twilioAccountSid: req.body.twilioAccountSid,
        twilioAuthToken: req.body.twilioAuthToken
    };
    twilioModel.create(twilio, function (err) {
        if (err) {
            return res.status(422).send({error: "Failed to add twilio account information."});
        } else {
            return res.status(201).send({success: "Successfully added twilio account information."});
        }
    });
};

exports.getTwilioAccountInfo = function (req, res) {
    const email = req.params.email;
    twilioModel.retrieveByEmail(email, function (err, results) {
        if (err) {
            return res.status(422).send({error: "Failed to retrieve twilio account information."});
        }

        if (!results) {
            return res.status(422).send({error: "There is no existing twilio account information yet."});
        }

        return res.status(200).json(results);
    });
};

exports.updateTwilioAccountInfo = function (req, res) {
    const id = req.body.id;
    const values = {
        email: req.body.email,
        twilioPhoneNumber: req.body.twilioPhoneNumber,
        twilioAccountSid: req.body.twilioAccountSid,
        twilioAuthToken: req.body.twilioAuthToken
    };
    twilioModel.update(id, values, function (err) {
        if (err) {
            return res.status(422).send({error: "Failed to update twilio account information."});
        } else {
            return res.status(201).send({success: "Successfully updated twilio account information."});
        }
    });
};

exports.deleteTwilioAccountInfo = function (req, res) {
    const id = req.body.id;
    twilioModel.destroy(id, function (req, res) {
        if (err) {
            return res.status(422).send({error: "Failed to remove twilio account information."});
        } else {
            return res.status(201).send({success: "Successfully removed twilio account information."});
        }
    });
};