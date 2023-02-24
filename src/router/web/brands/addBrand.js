const express = require('express');
const router = express.Router();
const brands_controller = require('../../../controller/brands');
const multer = require('multer');

// multer method to upload image to file
/////////////////////////////img/////////////////////////////

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `public/uploads/brands/`)
    },
    filename: function (req, file, cb) {
        const name = Date.now() + file.originalname;
        cb(null, name)
    }
})
const upload = multer({ storage: storage });
/////////////////////////////img/////////////////////////////

router.post('/', upload.single('brand_img'), brands_controller.addBrand);
module.exports = router;