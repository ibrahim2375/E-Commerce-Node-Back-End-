const express = require('express');
const router = express.Router();
const orders_controller = require('../../../controller/orders');
router.get('/:id', orders_controller.deleteOrder);
module.exports = router;