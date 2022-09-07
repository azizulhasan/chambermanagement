const mongoose = require('mongoose');
const Schema = mongoose.Schema

const TeamSchema = new Schema( {
    name: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    services: {
        type: Array,
        required: true
    },
    details: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
},{ timestamps : true})

module.exports = mongoose.model( 'Team', TeamSchema )