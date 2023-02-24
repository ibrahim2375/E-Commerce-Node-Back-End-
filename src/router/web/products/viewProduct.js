const express = require('express');
const router = express.Router();
const products_controller = require('../../../controller/products');
router.post('/:id', products_controller.viewProduct);
module.exports = router;