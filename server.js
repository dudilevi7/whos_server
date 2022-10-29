require('dotenv').config();

const { PORT } = require('./src/consts')
const express = require('express')
const cors = require('cors')
const db = require('./db/db')


const api = require('./src/routes')
const whosLogger = require('./src/utils/whosLogger')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use('/public/images', express.static("./public/images"))
app.use('/api/', api)

const initDB = () => db.mongooseConnect()

initDB()

app.listen(PORT, () => {
    whosLogger.info(`server is up and running on ${PORT}`)
})

process.on('uncaughtException', (err) => {
    whosLogger.error(err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    whosLogger.error(err);
    process.exit(1);
});