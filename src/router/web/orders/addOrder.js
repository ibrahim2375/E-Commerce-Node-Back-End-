const express = require('express');
const router = express.Router();
const orders_controller = require('../../../controller/orders');
router.post('/', orders_controller.addOrder);
module.exports = router;