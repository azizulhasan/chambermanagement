const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchedule = new Schema(
    {
        session_name: {
            type: String,
            required: true,
        },
        doctor_id: {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        },
        per_session_length: {
            type: Number,
            required: true,
        },
        session_date: {
            type: String,
            required: true,
        },
        session_time: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        paymentMethod: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            required: false,
            default: "Upcomming"
        },
        paymentStatus: {
            type: String,
            required: false,
            default: "Unpaid"
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('UserSchedule', userSchedule);
