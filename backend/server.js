// Install express, mongoose
//dev dependency nodemon, dotenv
//commands to run project
// 1. sudo systemctl start mongod // to start mongodb
// 2. npm run devStart

require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")

mongoose.connect(process.env.DATABASE_URL, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection

db.on('error', (error)=>console.error(error))
db.once('open', ()=>console.log('Connected to Database'))

app.use(cors());
app.use(express.json())

const appRoutes = require('./routes/appRoutes');
app.use('/appRoutes', appRoutes)

app.listen(3000, () => console.log("Server Started"))
 