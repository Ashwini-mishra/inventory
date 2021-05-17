const mongoose = require('mongoose');

const purchaseItems = new mongoose.Schema({

    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "item"
    },
    quantity: {
        type: String
    },
    unit: {
        type: String
    },
    cost: {
        type: Number
    },
    tax: {
        type: Number
    },
    total: {
        type: Number
    },
    basePrice: {
        type: Number
    }
});


const purchaseItemSchema = new mongoose.Schema({

    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vendor",
        require: true
    },
    items: [
        purchaseItems
    ],
    grandTotal: {
        type: Number
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const PurchaseItem = mongoose.model('purchaseItem', purchaseItemSchema)

module.exports = PurchaseItem;