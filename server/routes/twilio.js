var express = require("express");
var router = express.Router();

const passport = require('passport');

const twilioController = require("../controllers/twilio");
const requireAuthCounsellor = passport.authenticate('jwt-counsellor', {session: false});

router.get("/getSMSDetails", requireAuthCounsellor, twilioController.getAllTwilioAccountInfo);
router.post("/setSMSDetails", requireAuthCounsellor, twilioController.addOrUpdateTwilioAccountInfo);
router.delete("/removeSMSDetails", requireAuthCounsellor, twilioController.deleteAllTwilioAccountInfo);

module.exports = router;