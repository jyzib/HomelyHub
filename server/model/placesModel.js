const mongoose = require('mongoose')

const places = mongoose.Schema({
    title:{type:String},
    address:{type:String},
    description:{type:String},
    perkes:[{type:String}],
    checkin:{type:String},
    checkout:{type:String},
    maxGuest:{type:String},
    extraInfo:{type:String},
    addedphotos:[{type:String}],
    owner:{type:String}
})

const placesSchma = mongoose.model('place',places)
module.exports = placesSchma;