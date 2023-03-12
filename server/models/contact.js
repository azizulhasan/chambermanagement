const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema(
    {
        section_title: {
            type: String,
            required: false,
        },
        subjects: {
            type: String,
            required: true,
        },
        contacts: {
            type: Array,
            required: true,
        },
    },
    { timestamp: true }
);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
