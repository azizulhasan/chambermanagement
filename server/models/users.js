const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        speciality: {
            type: String,
            required: false,
            default: '',
        },
        services: {
            type: Array,
            required: false,
            default: [],
        },
        details: {
            type: String,
            required: false,
            default: '',
        },
        image: {
            type: String,
            required: false,
            default: '',
        },
        password: {
            type: String,
            required: true,
        },
        passwordReset: {
            type: String,
            required: false,
            default: '',
        },
        userRole: {
            type: String,
            required: false,
            default: 'USER',
        },
    },
    { timestamps: true }
);

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
