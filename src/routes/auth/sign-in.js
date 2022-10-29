const { auth } = require("../../lib");
const whosLogger = require("../../utils/whosLogger");

const signIn = async (req, res) => {
    try {
        const data = req.body
        const {
            username
        } = data
        whosLogger.info('trying to sign in', { username })
        const user = await auth.signIn(data);
        if (!user)
            throw new Error("User not exists!")

        const {
            _id,
            username: userName,
            img,
            highScore,
        } = user
        whosLogger.info('sign in has been success ,log in', { username: userName })
        
        return res.json({
            _id,
            username: userName,
            img,
            highScore: {
                result: highScore.result,
                time: highScore.time,
            },
        })
    } catch (error) {
        whosLogger.error(error)
        res.status(400).send(error.message)
    }
}

module.exports = signIn