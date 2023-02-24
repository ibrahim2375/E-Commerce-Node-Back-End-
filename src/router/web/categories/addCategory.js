const express = require('express');
const router = express.Router();
const categories_controller = require('../../../controller/categories');
const multer = require('multer');

// multer method to upload image to file
/////////////////////////////img/////////////////////////////

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `public/uploads/`)
    },
    filename: function (req, file, cb) {
        const name = Date.now() + file.originalname;
        cb(null, name)
    }
})
const upload = multer({ storage: storage });
/////////////////////////////img/////////////////////////////

router.post('/', upload.single('img'), categories_controller.addCategory);
module.exports = router;