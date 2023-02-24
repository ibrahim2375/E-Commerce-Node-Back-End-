const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    offer: {
        type: String,
        required: true,
    },
    offer_img: {
        type: String,
        required: true,
    },
    offer_details: {
        type: String,
    },
    bg_color: {
        type: String,
    },
    offer_color: {
        type: String,
    },
    url: {
        type: String,
    }

}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);