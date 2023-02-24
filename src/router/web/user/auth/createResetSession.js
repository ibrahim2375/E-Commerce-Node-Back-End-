const express = require('express');
const router = express.Router();
// loacalVariables user middleware
const loacalVariables = require('../../../../middlewares/localVariables');
// verify user middleware
const verifyUser = require('../../../../middlewares/verfiyUser');
const users_controller = require('../../../../controller/users');
router.get('/', users_controller.createResetSession);
module.exports = router;