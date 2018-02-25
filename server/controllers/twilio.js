const twilioModel = require("../models/twilio");

exports.getAllTwilioAccountInfo = function (req, res) {
    var twilio = twilioModel.getSMSFields();

    // Remove the "+1" at the beginning of the phone number if there is a number saved
    if (twilio.twilioPhoneNumber !== "") {
        twilio.twilioPhoneNumber = parseInt(twilio.twilioPhoneNumber.substring(2));
    }

    return res.status(200).json(twilio);
};

exports.addOrUpdateTwilioAccountInfo = function (req, res) {
    const values = {
        email: req.body.email.trim(),
        twilioPhoneNumber: req.body.twilioPhoneNumber.trim(),
        accountSid: req.body.accountSid.trim(),
        authToken: req.body.authToken.trim()
    };

    if (helper.checkBlankRequiredFields(twilio)) {
        return res.status(422).send({error: "You must enter all fields."});
    }

    // TODO: Add email regex check here
    // If email passes regex check, the function can continue
    // else, send a response to the frontend.

    if (isNaN(values.twilioPhoneNumber)) {
        return res.status(422).send({error: "Twilio phone number must be a number."});
    } else if (values.twilioPhoneNumber.toString().length !== 10) {
        return res.status(422).send({error: "Twilio phone number must be ten digits long."});
    } else {
        // E.164 format for phone numbers. Canadian extension only
        values.twilioPhoneNumber = "+1" + values.twilioPhoneNumber.toString();
    }

    // Change SMS fields on server.
    twilioModel.changeSMSFields(values);
    return res.status(201).send({success: "Successfully added or updated twilio account information."});
};

exports.deleteAllTwilioAccountInfo = function (req, res) {
    twilioModel.deleteSMSFields();
    return res.status(201).send({success: "Successfully removed twilio account information."});
};