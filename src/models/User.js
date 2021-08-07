const mongoose = require('mongoose');

const User = mongoose.model('users', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        default: '1',
    },
    created_time: {
        type: Date,
        default: new Date().toDateString(),
    },
    highScore: {
        result: {
            type: Number,
            default: 0,
        },
        time: {
            type: Date,
            default: new Date().toDateString(),
        }
    },
}));

module.exports = User