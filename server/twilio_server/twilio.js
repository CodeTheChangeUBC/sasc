const twilioModel = require("../models/twilio");

function createTwilioClient() {
    const twilio = twilioModel.getSMSFields();
    const accountSid = twilio.accountSid;
    const authToken = twilio.authToken;
    const client = require("twilio")(accountSid, authToken);
    return client;
}
