const mongoose = require('mongoose');

const Question = mongoose.model('questions', new mongoose.Schema({
    question: { type: String, required: true , unique: true },
    type: { type: String, required: true },
    answers : { type: Array , required  : true},
    correctAnswer : { type: Number , required : true}
}));

module.exports = Question;