const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    brand_name: {
        type: String,
        required: true,
    },
    brand_img: {
        type: String,
        required: true,
    },
    details: {
        type: String,
    }

}, { timestamps: true });

module.exports = mongoose.model('Brand', brandSchema);