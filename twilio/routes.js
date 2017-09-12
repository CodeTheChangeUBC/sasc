"use strict";

var SMSSettingsRouter = (function () {
    var SQLDbAccessor = require("../twilio/sqldbaccessor");
    var twilios = require("../twilio/models/twilio").twilio;

    function SMSSettingsRouter() {}
    SMSSettingsRouter.prototype.start = function () {
        var express = require("express");
        var router = express.Router();

        /* Add Twilio Account Info */
        //router.post("/smssettings", twilios.create);

        /* Get Twilio Account Info */
        router.get("/smssettings/:id", function (req, res) {
            var db = new SQLDbAccessor();
            db.getTwilio(function (rows) {
                if (rows !== null && rows !== undefined) {
                    res.json("smssettings", {
                        "email": rows[0].email,
                        "twilioPhoneNumber": rows[0].twilioPhoneNumber,
                        "accountSid": rows[0].accountSid,
                        "authToken": rows[0].authToken
                    });
                } else {
                    console.log("Failed to read from database!");
                }
            });
        });

        /* Update Twilio Account Info */
        //router.post("/smssettings/:email", twilios.update);

        /* Delete Twilio Account Info */
        router.post("/smssettings/:email", function (req, res) {
            var db = new SQLDbAccessor();
            var email = req.body.email;
            db.deleteTwilio(email);
        });

        module.exports = router;
    };
    return SMSSettingsRouter;
}());
var smssettingsrouter = new SMSSettingsRouter();
smssettingsrouter.start();


