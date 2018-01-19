const twilioModel = require("../models/twilio");

function getTwilioInfo() {
    twilioModel.list(function (err, results) {
        if (err) {
            return res.status(422).send({error: "Failed to retrieve twilio account information."});
        }

        if (results.length === 0) {
            return res.status(422).send({error: "There is no existing twilio account information yet."});
        }

        // We are expecting only one result
        return results[0];
    });
}

function createTwilioClient(twilioInfo) {
    const accountSid = twilioInfo.accountSid;
    const authToken = twilioInfo.authToken;
    const client = require("twilio")(accountSid, authToken);
    return client;
}