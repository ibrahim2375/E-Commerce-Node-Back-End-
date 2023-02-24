const express = require('express');
const router = express.Router();
const users_controller = require('../../../controller/users');
router.get('/', users_controller.getAllUsers);
module.exports = router;