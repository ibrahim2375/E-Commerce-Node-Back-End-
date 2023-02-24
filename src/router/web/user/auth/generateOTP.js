const express = require('express');
const router = express.Router();
// loacalVariables user middleware
const loacalVariables = require('../../../../middlewares/localVariables');
// verify user middleware
const verifyUser = require('../../../../middlewares/verfiyUser');
// // send mail to user contain the code middleware
// const sendMail = require('../../../../middlewares/verfiyUser');

const users_controller = require('../../../../controller/users');
router.post('/', verifyUser, loacalVariables, users_controller.generateOTP);
module.exports = router;