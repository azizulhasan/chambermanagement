const mongoose = require('mongoose')
const Schema    = mongoose.Schema

const usersSchema = new Schema({
    departement:{
        type:String,
        required: true
    },
    branch:{
        type:Array,
        required: true
    },
    sessionLength:{
        type:Number,
        required: true
    },
    consultant: {
        type: String,
        required: true,
    },
    date: {
        type: Array,
        required: false,
        default: []
    },
    timeSlot: {
        type: String,
        required: false,
        default: ''
    },
    image: {
        type: String,
        required: false,
        default: '',
    },
    password:{
        type:String,
        required: true,
    },
    passwordReset: {
        type: String,
        required: false,
        default: ""
    },
    userRole: {
        type: String,
        required: false,
        default: "USER"
    }
}, { timestamps: true })


const Users = mongoose.model('Users', usersSchema)

module.exports = Users