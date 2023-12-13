const express = require('express')
const router = require('./src/routes/api')
const app = new express()
const ratelimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('hpp')
const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const path = require('path')
const URL = "mongodb://localhost:27017/EcommPractical"
const OPTION = ""
mongoose.connect(URL,OPTION).then((result)=>{
    console.log("Database is connected")
}).catch((error)=>{
    console.log("Something has wrong"+error)
})
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({limit:"50mb"}))
const limiter = ratelimit({
    windowMS:15*60*1000,max:3000
})
app.use(limiter)
app.use("/api/v1",router)
app.use(express.static('client/dist'))

//Add React Fronted Routing
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
})
module.exports = app