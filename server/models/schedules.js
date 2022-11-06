const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schedulesSchema = new Schema({
    branch: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    perSessionLength: {
        type: Number,
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


module.exports = mongoose.model('Schedules', schedulesSchema)