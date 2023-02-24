const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    images: {
        type: Array,
    },
    category: {
        type: String,
    },
    brand: {
        type: String,
    },
    views: {
        type: Number,
        default: 0,
    },
    TotalReviewStars: {
        type: Number,
        default: 0,
    },
    reviews: {
        type: Array,
        default: 0,
    },
    price: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
    },
    avilableColors: {
        type: String,
    },
    avilableSizes: {
        type: Array,
    },
    leftedItems: {
        type: Number,
        default: 1,
    },
    offer: {
        type: String,
    },
    arrivalTime: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);