require('dotenv').config();

const { PORT = 3001 } = process.env
const express = require('express')
const cors = require('cors')
const db = require('./db/db')
const knex = require('knex')


const api = require('./src/routes')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(cors())

app.use("/public/images", express.static("./public/images"))
app.use('/api/', api)

const initDB = () => db.mongooseConnect()

initDB()

app.listen(PORT, ()=>{
    console.log(`server is up and running on ${PORT}`)
})