const mongoose = require('mongoose');

const Question = mongoose.model('questions', new mongoose.Schema({
    question: { 
        type: String, 
        required: true,
        unique: true,
    },
    type: { 
        type: String, 
        required: true,
    },
    answers : { 
        type: Array, 
        required  : true,
    },
    correctAnswer : { 
        type: String, 
        required : true,
    },
    hint: { 
        type:String, 
        required: true,
    },
    img: { 
        type:String 
    }, 
    points: { 
        type:Number, 
        default: 5,
     }
}));

module.exports = Question