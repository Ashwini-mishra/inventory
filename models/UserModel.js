const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true
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
        required: true
    },
    contact: {
        type: String,
        trim: true,
        required:true
       
    },
    address: {
        type: String,
        trim: true,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "role",
        required: true,
    },
    lastSeen:
    {
        type:Date,
        default: Date.now(),
    
    },
    status:
    {
        type:Boolean,
        default:0
    },

}, { timestamps: true });

const User =  mongoose.model('User', userSchema);

module.exports = User;