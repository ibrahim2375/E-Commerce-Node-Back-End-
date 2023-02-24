const express = require('express');
const router = express.Router();
const products_controller = require('../../../controller/products');
router.get('/:id', products_controller.deleteProduct);
module.exports = router;