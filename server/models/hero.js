const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const heroSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        profession: {
            type: String,
            required: true,
        },
        icons: {
            type: Array,
            required: true,
        },
        backgroundImage: {
            type: String,
            required: true,
        },
        backgroundImageOpacity: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;
