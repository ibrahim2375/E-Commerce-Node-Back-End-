const express = require('express');
const router = express.Router();
const offers_controller = require('../../../controller/offers');
router.get('/', offers_controller.getOffers);
module.exports = router;