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

exports.getAllMessagesFromTwilio = function () {
    const twilio = getTwilioInfo();
    const client = createTwilioClient(twilio);
    client.messages.each(function (message) {
        message.body;
        message.date_sent;
        message.from;
        message.to;
    });
};

exports.getNewMessagesFromTwilio = function () {

};

exports.sendMessageBySMS = function (messageContent) {
    const twilio = getTwilioInfo();
    const client = createTwilioClient(twilio);
    var message = {
        to: "",
        from: twilio.twilioPhoneNumber,
        body: messageContent
    };
    client.messages.create(message).then(function (err, message) {
    
    });
};
