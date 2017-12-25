var express = require("express");
var router = express.Router();
const twilioController = require("../controllers/twilio");

router.get("/settings", twilioController.getAllTwilioAccountInfo);
router.post("/settings", twilioController.addOrUpdateTwilioAccountInfo);
router.delete("/settings", twilioController.deleteAllTwilioAccountInfo);

module.exports = router;