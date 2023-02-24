const express = require('express');
const router = express.Router();
const offers_controller = require('../../../controller/offers');
const multer = require('multer');

// multer method to upload image to file
/////////////////////////////img/////////////////////////////

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `public/uploads/offers/`)
    },
    filename: function (req, file, cb) {
        const name = Date.now() + file.originalname;
        cb(null, name)
    }
})
const upload = multer({ storage: storage });
/////////////////////////////img/////////////////////////////

router.post('/', upload.single('offer_img'), offers_controller.addOffer);
module.exports = router;