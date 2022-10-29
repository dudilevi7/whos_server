const mongoose = require('mongoose');
const { MONGODB_CONNECTION_URL } = require('../src/consts');
const whosLogger = require('../src/utils/whosLogger');

const mongooseConnect = () => {
    mongoose.connect(MONGODB_CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {
        whosLogger.info('mongoose has been connected successfully')
    });
    return db
}


module.exports = {
    mongooseConnect,
}