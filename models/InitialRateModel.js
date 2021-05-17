const mongoose = require('mongoose');

const items = new mongoose.Schema({

    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "item"
    },
    quantityPerUnit: {
        type: String,
    },
    unit: {
        type: String
    },
    cost: {
        type: String
    }
});


const initialRateSchema = new mongoose.Schema({

    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vendor",
        require: true
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        require: true
    }],
    items: [items],
    status: { type: Boolean, default: false },

}, { timestamps: true, versionKey: false })


const InitialRate = mongoose.model('initialRate', initialRateSchema);

module.exports = InitialRate;