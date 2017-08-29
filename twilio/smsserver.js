var SMSServer = (function () {

    function SMSServer() {
        
    }

    var twilioSettings = require("./index").twilio;
    var sqldbaccessor = require("./sqldbaccessor");

    /**
        Sends message from Twilio number to SMS number.
        Messages get stored to our database.
    **/
    SMSServer.prototype.sendMessageToSMS = function (toNumber, body) {
        var info = SMSServer.twilioSettings.getTwilioInfo();
        var fromNumber = info[1];
        var accountSid = info[2];
        var authToken = info[3];
        var obj = require("twilio")(accountSid, authToken);
        obj.client.messages.create({
            to: toNumber,
            from: fromNumber,
            body: body
        }, function (err, message) {
            if (err) {
                console.log("DIDN'T WORK");
            }
            console.log(message.sid);
            var userid = SMSServer.sqldbaccessor.getUserIdByPhoneNumber(toNumber);
            
            // TODO: get everything else required to create a Twilio message
            
            SMSServer.twilioMessages.create(body, userid, sessionid, counsellorid);
        });
    };



    /**
        Returns: a list of message objects for a specific contact
    **/
    SMSServer.prototype.listMessagesForContact = function (contactNumber) {
        var info = SMSServer.twilioSettings.getTwilioInfo();
        var accountSid = info[2];
        var authToken = info[3];
        var obj = require("twilio")(accountSid, authToken);
        var result = obj.client.messages.list(function (err, data) {
            var messages = [];
            data.messages.forEach(function (message) {
                console.log(message.body);
                if (message.to === contactNumber || message.from === contactNumber) {
                    messages.push(message);
                }
            });
            return messages;
        });
        return result;
    };

    /**
        Delete messages on Twilio
    **/

    return SMSServer;

}());

module.exports = SMSServer;