const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

const userModel = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"name is required"],
        minLength:[4,"Name must be 4 characters long"]
    },
    username:{
        type:String,
        trim:true,
        required:[true,"username is required"],
        unique:true,
        minLength:[4,"username must be 4 characters long"]
    },
    email:{
        type:String,
        trim:true,
        required:[true,"username is required"],
        unique:true,
        match:[/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"enter valid email"]
    },
    password:{
        type:String
    }
},{timestamps:true})

userModel.plugin(plm)

const user = mongoose.model('user',userModel)

module.exports = user