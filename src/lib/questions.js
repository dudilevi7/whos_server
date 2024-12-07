const Question = require('../models/Question');
const whosLogger = require('../utils/whosLogger');

const getQuestions = async () => {
    try {
        const questions = await Question.find({});
        if (!questions)
            throw new Error("There's problem on server")
        else
            return questions;
    } catch (error) {
        whosLogger.error(error)
    }
}
const postQuestion = async (data) => {
    try {
        const {
            answers,
            correctAnswer: correctAnswerIndex,
        } = data

        data.correctAnswer = answers[correctAnswerIndex]
        
        const question = new Question(data);
        const result = await question.save();
        if (!result)
            throw new Error("The question isn't inserted!")
        else
            return result;
    } catch (error) {
        whosLogger.error(error)
    }
}
module.exports = {
    getQuestions,
    postQuestion
}