var SMSSettings = (function () {
    
    function SMSSettings() {
        var twilios = require("./index").twilio;
    }

    SMSSettings.prototype.updateFields = function (jsonObj) {
        SMSSettings.twilios.update(obj.email, obj.twilioNumber, obj.accSid, obj.authToken);
    }

    SMSSettings.prototype.removeTwilio = function (email) {
        SMSSettings.twilios.deleteTwilio(email);
    }

    return SMSSettings;
})();

module.exports = SMSSettings;