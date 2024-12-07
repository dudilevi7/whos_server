const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const User = mongoose.model('users', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
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
    role: {
        type: String,
        default: 'player'
    },
    keys: {
        privateKey: {
            type: String,
            default: ''
        },
        publicKey: {
            type: String,
            default: ''
        },
    }
}).plugin(passportLocalMongoose))

module.exports = User