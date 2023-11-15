const mongoose = require('mongoose')
const userSchma = new mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
})
const UserModel = mongoose.model('User',userSchma)
module.exports = UserModel;