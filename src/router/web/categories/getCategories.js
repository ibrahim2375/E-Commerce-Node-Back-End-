const express = require('express');
const router = express.Router();
const categories_controller = require('../../../controller/categories');
router.get('/', categories_controller.getCategories);
module.exports = router;