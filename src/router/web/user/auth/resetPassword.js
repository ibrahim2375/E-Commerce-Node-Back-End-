const express = require('express');
const router = express.Router();
// authenticate user middleware
// const authenticate = require('../../../../middlewares/authenticateUser');
const users_controller = require('../../../../controller/users');
router.put('/', users_controller.resetPassword);
module.exports = router;