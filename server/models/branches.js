const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BranchesSchemma = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        details: {
            type: String,
            required: false,
        },
        phone: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Branches', BranchesSchemma);
