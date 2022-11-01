const mongoose = require('mongoose')
const Schema    = mongoose.Schema

const schedulesSchema = new Schema({
    branch:{
        type:String,
        required: true
    },
    PerSessionLength:{
        type:Number,
        required: true
    },
    offDay: {
        type: Array,
        required: true,
        default: []
    },
    timeSlots: {
        type: Array,
        required: true,
        default: []
    },
}, { timestamps: true })


const Schedules = mongoose.model('Schedules', schedulesSchema)

module.exports = Schedules