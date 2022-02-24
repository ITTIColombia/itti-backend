const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const enums = require('enums');


const purchaseSchema = new Schema({
    price: {
        type: Number,
        required: true,
        min: 0
    },
    purchaseStatus:{
        type: String,
        required: true,
        enums: enums.purchaseStatus,
    },
    address: {
        type: String,
        required: true,
        minlength: 4,
        maxLength: 150
    },
    postalCode: {
        type: String,
        required: true,
        minlength: 4,
        maxLength: 8
    },
    city: {
        type: String,
        required: true,
        minlength: 4,
        maxLength: 50
    },
    department: {
        type: String,
        required: true,
        minlength: 4,
        maxLength: 50
    },
    country: {
        type: String,
        required: true,
        minlength: 4,
        maxLength: 50
    },
    media: {
        type: [String],
        required: true,
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: true
    }
},{
    timestamps: true,
    collection: "Purchase"
})

module.exports = mongoose.model("Purchase", purchaseSchema)