const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const forgotpasswordSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        timeStart: {
            type: String,
            required: false,
        },
        timeEnd: {
            type: String,
            required: false,
        },
    },
    { timestamp: true }
);

const ForgotPassword = mongoose.model('Contact', forgotpasswordSchema);

module.exports = ForgotPassword;
