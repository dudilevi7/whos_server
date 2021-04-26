const quesService = require('../services/quesService');

const questions = async(req,res)=>{
    try {
        const questions = await quesService.getQuestions();
        if (!questions) 
            throw new Error("Questions are not exist!")
        else    
            res.json(questions)

    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

const enterQuestion = async(req,res)=>{
    try {
        const newQuestion = req.body;
        const result = quesService.postQuestion(newQuestion);
        if (!result) 
            throw new Error("The question isn't insert to the server")
        else
            res.json(result) 
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

module.exports = {
    questions,
    enterQuestion
}