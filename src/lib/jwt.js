const jwt = require('jsonwebtoken')

const verifyToken = async (payload, publicKey, expiry, authority) => {
    console.log('trying to verify jwt')
    const token = await jwt.verify(payload, Buffer.from(publicKey, 'base64').toString('utf-8'), {
        expiresIn: expiry,
        algorithm: 'RS256',
        issuer: authority,
    })
    return token
}

const decode = async (payload) => {
    console.log('decoding jwt...')
    const decoded = await jwt.decode(payload)
    return decoded
}

const sign = async (payload, privateKey, expiry, authority) => {
    console.log('trying to sign jwt')
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