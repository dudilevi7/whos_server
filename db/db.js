const mongoose = require('mongoose');

const mongooseConnect = () => {
    mongoose.connect('mongodb://localhost:27017/whos', {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex : true,useFindAndModify: false });

    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', ()=> {
        console.log('mongoose has been connected successfully')
    });
    return db
}


module.exports = {
    mongooseConnect,
}