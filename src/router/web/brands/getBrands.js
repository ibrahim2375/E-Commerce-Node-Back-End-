const express = require('express');
const router = express.Router();
const brands_controller = require('../../../controller/brands');
router.get('/', brands_controller.getBrands);
module.exports = router;