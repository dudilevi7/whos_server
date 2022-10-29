const { auth } = require("../../lib");
const whosLogger = require("../../utils/whosLogger");

const editProfile = async (req, res) => {
    try {
        const {
            file, body: { restData }
        } = req
        const data = JSON.parse(restData);

        const usernameIsExists = await auth.isUsernameExists(data);
        if (usernameIsExists) throw new Error("Username already exists");

        whosLogger.info('trying to edit profile')
        const updatedUser = await auth.updateProfile(data, file);

        if (!updatedUser) throw new Error("edit profile has been failed");
        whosLogger.info('edit profile has been successfully')

        const {
            _id,
            username,
            img,
            highScore,
        } = updatedUser
        
        return res.json({
            _id,
            username,
            img,
            highScore: {
                result: highScore.result,
                time: highScore.time,
            },
        })

    } catch (error) {
        whosLogger.error(error)
        return res.status(400).send(error.message);
    }

}
module.exports = editProfile