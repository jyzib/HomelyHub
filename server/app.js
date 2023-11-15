const express = require('express')
const app = express()
const cookiesParser = require('cookie-parser')

const cors = require('cors')
const mongoose = require('mongoose')
const user = require('./routes/user')

mongoose.connect('mongodb://127.0.0.1:27017/airbnb').then(()=>console.log('Db connected')).catch(()=>console.log('db connection faild'))
app.use(cookiesParser())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

const port = 3000
app.use(express.json())

app.use('/user',user)
app.get('/test',(req,res)=>{
    res.status(200).json({msg:true})

})



app.listen(port,()=>console.log(`Server is running on port ${port}`))