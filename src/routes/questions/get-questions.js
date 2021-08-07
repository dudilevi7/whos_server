const { questions } = require('../../lib');

const getQuestions = async(req,res)=>{
    try {
        console.debug('trying to get the questions')
        const questionsList = await questions.getQuestions();
        if (!questionsList) 
            throw new Error("failed to got the questions")
        else {
            console.log('getting questions has been success')
            res.json(questionsList)
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

module.exports = getQuestions