const express = require('express');
const router = express.Router();
const admin_controller = require('../../../controller/admin');
router.post('/', admin_controller.login);
module.exports = router;