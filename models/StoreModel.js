const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({

    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "item",
        require: true
    },
    itemQuantity: {
        type: String,
        require: true
    },
    unit: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const Store =  mongoose.model('store', storeSchema);

module.exports = Store;