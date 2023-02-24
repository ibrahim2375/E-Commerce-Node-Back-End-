const express = require('express');
const router = express.Router();
// authenticate user middleware
const authenticate = require('../../../../middlewares/authenticateUser');
const users_controller = require('../../../../controller/users');
router.put('/', authenticate, users_controller.updateUser);
module.exports = router;