const express = require('express');
const router = express.Router();
const users_controller = require('../../../../controller/users');
router.post('/:id', users_controller.getUser);
module.exports = router;