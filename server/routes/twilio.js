var express = require("express");
var router = express.Router();
const twilioController = require("../controllers/twilio");

router.get("/getSMSDetails", twilioController.getAllTwilioAccountInfo);
router.post("/setSMSDetails", twilioController.addOrUpdateTwilioAccountInfo);
router.delete("/removeSMSDetails", twilioController.deleteAllTwilioAccountInfo);

module.exports = router;