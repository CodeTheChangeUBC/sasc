var express = require('express');
var router = express.Router();
const counsellorsController = require('../server/controllers').counsellors;

/* GET counsellors listing. */
router.get('/', function(req, res, next) {
  res.send('Welcome to the Counsellors index!');
});

router.post('/', counsellorsController.create);


module.exports = router;
