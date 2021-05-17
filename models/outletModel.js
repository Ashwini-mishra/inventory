const mongoose = require('mongoose');
const outletSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        require: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    phone_number: {
        type: String
    },
    address: {
        type: String,
    },
    gst_number: {
        type: String,
    },
    role: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('outlet', outletSchema)