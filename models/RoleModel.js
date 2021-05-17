const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({

    roleName: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    status: {
        type: Boolean,
        default: 0
    }

}, { timestamps: true });

const Role =mongoose.model('role', roleSchema);

module.exports =Role;