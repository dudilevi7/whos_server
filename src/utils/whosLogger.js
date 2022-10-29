const pino = require('pino')
const pretty = require('pino-pretty')
const stream = pretty({
    colorize: true
  })
const whosLogger = pino(stream)

module.exports = whosLogger
