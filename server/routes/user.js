const express = require("express");
const bcrypt = require('bcryptjs')
const user = express.Router()
const jwt = require('jsonwebtoken')
const userModel = require('../model/userModel')
const salt = bcrypt.genSaltSync(10)
const log = console.log.bind(console)
const path = require('path')
const donwload = require('image-downloader')
const jwtSecreat = 'dnf2ou3yh79f2g38fhxn39183ywx'
user.post('/login',async (req,res)=>{
    const {email,password} = req.body
const data = await userModel.findOne({email})
if(data){

    const datauser=  bcrypt.compareSync(password,data.password)
    if(datauser){
        log('Login ')
        jwt.sign({email:data.email,id:data._id,name:data.name},jwtSecreat,{},(err,token)=>{
            if(err) throw err;
            return res.cookie('token',token,{sameSite: 'None',secure: true,}).json({data,status:true})
        })
    }else{
       log('wrong password')
       return res.status(200).json({data,status:false})
    }
}else{
    return res.status(200).json({msg:'email not found'})
}
  
})



user.post('/register', async (req,res)=>{
   
    const {name,email,password } = req.body
    console.log(name,email,password)
  const userSave =   await userModel.create({name,email,
        password:bcrypt.hashSync(password,salt)})
    res.status(200).json({msg:userSave})
})
user.get('/profile',(req,res)=>{
    const {token} = req.cookies
    if(token){
jwt.verify(token,jwtSecreat,{},(err,user)=>{
 if(err) throw err;
 return res.json({user,status:true})
})
    }else{

      return  res.json({status:false})
    }

    

})

user.post('/logout',(req,res)=>{
res.cookie('token','',{sameSite: 'None',secure: true,}).json({msg:'logout'})
})





user.post('/upload-by-link', async (req,res)=>{
    const newName = 'photo'+Date.now() + '.jpg'

    const parentDir = path.join(__dirname, '..');
    const {link} = req.body
   await donwload.image({
      url:link,
      dest:parentDir +'/upload/' + newName
    })
res.json(newName)
})
module.exports = user