const express = require('express');
const router = express.Router();
// loacalVariables user middleware
// const loacalVariables = require('../../../../middlewares/localVariables');
const users_controller = require('../../../../controller/users');
router.get('/', users_controller.verifyOTP);
module.exports = router;