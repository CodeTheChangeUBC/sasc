var express = require('express');
var router = express.Router();
const usersController = require('../server/controllers').users;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Welcome to the users index!');
});

router.post('/', usersController.create);

module.exports = router;
