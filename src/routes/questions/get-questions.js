const { questions } = require('../../lib');
const whosLogger = require('../../utils/whosLogger');

const getQuestions = async(req,res)=>{
    try {
        whosLogger.info('trying to get the questions')
        const questionsList = await questions.getQuestions();
        if (!questionsList) 
            throw new Error("failed to got the questions")
        else {
            whosLogger.info('getting questions has been success')
            res.json(questionsList)
        }
    } catch (error) {
        whosLogger.error(error)
        res.status(400).send(error.message)
    }
}

module.exports = getQuestions