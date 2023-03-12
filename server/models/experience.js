const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const experienceSchema = new Schema(
    {
        position: {
            type: String,
            required: true,
        },
        from: {
            type: Number,
            required: true,
        },
        to: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        details: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;
