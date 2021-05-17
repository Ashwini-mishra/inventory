const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({

    itemName: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    unit: {
        type: String,
        require: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "subCategory"
    },
    status: {
        type: Boolean,
        default: 0
    }
}, { timestamps: true })

const Item = mongoose.model('item', itemSchema);

module.exports = Item;