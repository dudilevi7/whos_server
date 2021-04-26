const { PORT = 3001 } = process.env;
const express = require('express');
const cors = require('cors');
const db = require('./db/mongoConnect');
const knex = require('knex');
const multer = require('multer');
const userRoute = require('./routes/userRoute');
const statsRoute = require('./routes/statsRoute')
const quesRoute = require('./routes/quesRoute')
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cors());

app.use('/user',userRoute)
app.use('/stats',statsRoute);
app.use('/questions',quesRoute);

app.get('/',(req,res)=>{
    res.send('Hello WhosThaTFaMouS!')
})



app.listen(PORT, ()=>{
    console.log('Whos_server is running now!')
})