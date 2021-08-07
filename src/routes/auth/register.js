const auth = require('../../lib');

const register = async (req, res) => {
    try {
        const { file, body: { restData } } = req
        const data = JSON.parse(restData)

        console.debug('trying to check if user exists')
        const isExists = await auth.isUsernameExists(data);

        if (isExists) throw new Error("Username already exists")
        console.log('username not exists , trying to complete register of new user')

        const newUser = await auth.register(data, file);
        if (!newUser) throw new Error("User not created")
        console.log('username has been created')

        const {
            _id,
            username,
            img,
            highScore,
        } = newUser

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
        console.log(error)
        return res.status(400).send(error.message);
    }
}

module.exports = register