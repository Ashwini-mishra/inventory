const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({

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
    phoneNumber: {
        type: String
    },
    address: {
        type: String,
    },
    gstNumber: {
        type: String,
        maxlength:15,
        minlength:15
    },
    status: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Vendor = mongoose.model('vendor', vendorSchema)
module.exports = Vendor;