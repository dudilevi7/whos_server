const { questions } = require("../../lib");
const whosLogger = require("../../utils/whosLogger");

const postQuestion = async(req,res)=>{
    try {
        const { body: newQuestion } = req;
        
        whosLogger.info('trying to post new question')
        const success = questions.postQuestion(newQuestion);
        if (!success) 
            throw new Error("failed to post question")
        else{
            whosLogger.info('question has been posted successfully')
            res.json(success)
         }
    } catch (error) {
        whosLogger.error(error)
        res.status(400).send(error.message)
    }
}

module.exports = postQuestion