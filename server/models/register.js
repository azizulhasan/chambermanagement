const mongoose = require('mongoose')
const Schema    = mongoose.Schema

const registerSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    phone:{
        type:Number,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    passwordReset: {
        type: String,
        required: false
    }
}, { timestamps: true })


const Register = mongoose.model('Register', registerSchema)

module.exports = Register