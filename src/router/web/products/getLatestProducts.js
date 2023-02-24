const express = require('express');
const router = express.Router();
const products_controller = require('../../../controller/products');
router.get('/', products_controller.getLatestProduct);
module.exports = router;