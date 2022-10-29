const NodeRSA = require('node-rsa')
const { AUTHORITY } = require('../../consts')
const {
    auth,
    JWT
} = require('../../lib')
const whosLogger = require('../../utils/whosLogger')

const register = async (req, res) => {
    try {
        const { file, body: { restData } } = req
        const data = JSON.parse(restData)

        whosLogger.info('trying to check if user exists')
        const isExists = await auth.isUsernameExists(data);

        if (isExists) throw new Error("Username already exists")
        whosLogger.info('username not exists , trying to complete register of new user')
        
        const keys = new NodeRSA({b: 1024})
        const priv = keys.exportKey('pkcs1-private-pem')
        const pub = keys.exportKey('pkcs8-public-pem')

        const privateKey = Buffer.from(priv).toString('base64')
        const publicKey = Buffer.from(pub).toString('base64')

        data.keys = {
            publicKey,
            privateKey,
        }

        const newUser = await auth.register(data, file);
        if (!newUser) throw new Error("User not created")

        const {
            _id: userId,
            username,
            img,
            highScore,
        } = newUser

        let user = { 
            userId,
            username,
            img,
            highScore,
        }

        whosLogger.info(`user ${userId} has been created`, { user })

        const token = await JWT.sign(user, privateKey, '10h', AUTHORITY)

        if (!token) {
            throw new Error('failed to sign jwt , returning 400')
        }

        res.cookie('WHOS_COOKIE', token, { maxAge: 360000 })

        return res.json({
            _id: userId,
            username,
            img,
            highScore: {
                result: highScore.result,
                time: highScore.time,
            },
            token,
        })

    } catch (error) {
        whosLogger.error(error)
        return res.status(400).send(error.message);
    }
}

module.exports = register