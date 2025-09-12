require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db')
app.use(cors())

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const userroutes = require('./routes/usersroute')
app.use('/user',userroutes)

const port = 4000;
app.listen(port,()=>{
    console.log("server is roaring 🚀")
})

