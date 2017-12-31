var express = require("express");
var router = express.Router();

const passport = require('passport');

const twilioController = require("../controllers/twilio");
const requireAuthCounsellor = passport.authenticate('jwt-counsellor', {session: false});

router.get("/settings", requireAuthCounsellor, twilioController.getAllTwilioAccountInfo);
router.post("/settings", requireAuthCounsellor, twilioController.addOrUpdateTwilioAccountInfo);
router.delete("/settings", requireAuthCounsellor, twilioController.deleteAllTwilioAccountInfo);

module.exports = router;