const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({

    subCatName: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    status: {
        type: Boolean,
        default: 0
    }
}, { timestamps: true });

const SubCategory = mongoose.model('subCategory', subCategorySchema);

module.exports = SubCategory;