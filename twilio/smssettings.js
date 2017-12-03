"use strict";
var SMSSettings = (function () {
    var twilios = require("./index").twilio;
    var Dbaccessor = require("./sqldbaccessor");
    function SMSSettings() {}

    SMSSettings.prototype.createTwilio = function (email, twilioPhoneNumber, accountSid, authToken) {
        var db = new Dbaccessor();
        db.createTwilio(email, twilioPhoneNumber, accountSid, authToken);
    };

    /**
        Returns Twilio fields in an object.
    **/
    SMSSettings.prototype.getFields = function () {
        var db = new Dbaccessor();
        return db.getTwilioFields();
    };

    SMSSettings.prototype.updateFields = function (email, twilioPhoneNumber, accountSid, authToken) {
        twilios.update(email, twilioPhoneNumber, accountSid, authToken);
    };

    SMSSettings.prototype.removeTwilio = function (email) {
        twilios.deleteTwilio(email);
    };

    return SMSSettings;
}());

module.exports = SMSSettings;