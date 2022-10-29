const jwt = require('jsonwebtoken')
const whosLogger = require('../utils/whosLogger')

const verifyToken = async (payload, publicKey, expiry, authority) => {
    whosLogger.info('trying to verify jwt')
    const token = await jwt.verify(payload, Buffer.from(publicKey, 'base64').toString('utf-8'), {
        expiresIn: expiry,
        algorithm: 'RS256',
        issuer: authority,
    })
    return token
}

const decode = async (payload) => {
    whosLogger.info('decoding jwt...')
    const decoded = await jwt.decode(payload)
    return decoded
}

const sign = async (payload, privateKey, expiry, authority) => {
    whosLogger.info('trying to sign jwt')
    const token = await jwt.sign(payload, Buffer.from(privateKey, 'base64').toString('utf-8'), {
        expiresIn: expiry,
        algorithm: 'RS256',
        issuer: authority,
    })
    return token
}

module.exports = {
    verifyToken,
    decode,
    sign,
}