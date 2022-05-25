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
    artisan: {
        ref: "Artisan",
        type: Schema.Types.ObjectId,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    descriptionES: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 250,
    },
    descriptionEN: {
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
    techniqueES: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 250
    },
    techniqueEN: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 250
    },
    materialsES: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 250
    },
    materialsEN: {
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
    caresES: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 250
    },
    caresEN: {
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
    media: {
        photos: {
            type: [String],
            required: true
        }
    }
},{
    timestamps: true,
    collection: "Product"
})

module.exports = mongoose.model("Product", productSchema);