var express = require('express');
var router = express.Router();
const Counsellor = require('../models').counsellor;

/* Requests for /counsellors */
router.get('/', Counsellor.list);
router.post('/', Counsellor.create);
/* Get Counsellor with id counsellorId */
router.get('/:counsellorId', Counsellor.retrieve);
// Update counsellor with specified id
router.put('/:counsellorId', Counsellor.lookup, Counsellor.update);
// Delete counsellor with specified id
router.delete('/:counsellorId', Counsellor.lookup, Counsellor.destroy);

module.exports = router;
