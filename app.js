const express=require('express')
const app=express()
app.use(express.urlencoded({extended:false}))
const dotenv=require('dotenv')
dotenv.config()
const Connection = require('./model/Connection')
const Router = require('./Router/AppRouter')

app.use('/',Router)





const PORT=process.env.APP_PORT||8000
app.listen(PORT,()=>console.log('server running at '+PORT))