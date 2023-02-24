const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    ban: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        required: true,
    },
    country: {
        type: String,
    },
    number: {
        type: String,
        required: true,
    },
    purchases: {
        type: Array,
        default: []
    },
    favorites: {
        type: Array,
        default: []
    },
    card: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);