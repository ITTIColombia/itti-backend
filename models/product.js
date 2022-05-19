const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const enums = require('./enums')

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxLength: 50
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 250,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    media: {
        type: [String],
        required: true,
    },
    productType: {
        type: String,
        required: true,
        enum: enums.productType
    },
    productLabour: {
        type: String,
        required: true,
        enum: enums.productLabour
    },
    fabricationDays: {
        type: Number,
        required: true,
        min: 0
    },
    technique: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 250
    },
    productCategory:{
        type: String,
        required: true,
        enum: enums.productCategory
    },
    cares: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 250
    },
    visible: {
        type: Boolean,
        required: true,
        default: false
    },
    artisan: {
        ref: "Artisan",
        type: Schema.Types.ObjectId,
        required: true
    }
},{
    timestamps: true,
    collection: "Product"
})

module.exports = mongoose.model("Product", productSchema);