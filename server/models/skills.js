const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema(
    {
        section_title: {
            type: String,
            required: false,
        },
        top_details: {
            type: String,
            required: false,
        },
        skills: {
            type: Array,
            required: true,
        },
    },
    { timestamp: true }
);

const Skills = mongoose.model('Skills', skillSchema);

module.exports = Skills;
