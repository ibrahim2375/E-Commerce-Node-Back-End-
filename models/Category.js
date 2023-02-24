const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    bg_color: {
        type: String,
    }

}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);