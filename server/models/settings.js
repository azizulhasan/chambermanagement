const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        password_confirm: {
            type: String,
            required: true,
        },
        welcome_message: {
            type: String,
            required: true,
        },
        welcome_message_is_display: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
);

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
