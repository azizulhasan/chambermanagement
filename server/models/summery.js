const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const summerySchema = new Schema(
    {
        section_title: {
            type: String,
            required: false,
        },
        top_details: {
            type: String,
            required: false,
        },
        summery_title: {
            type: String,
            required: false,
        },
        education_title: {
            type: String,
            required: false,
        },
        experience_title: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: true,
        },
        summery: {
            type: String,
            required: true,
        },
    },
    { timestamp: true }
);

const Summery = mongoose.model('summery', summerySchema);

module.exports = Summery;
