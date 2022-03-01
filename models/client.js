const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardItemSchema = new Schema({
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    product: {
        ref: "Product",
        required: true,
        type: Schema.Types.ObjectId
    }
})

const clientSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxLength: 50
    },
    cellphoneNumber: {
        type: String,
        required: true,
        minlength: 11,
        maxLength: 12
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
    email: {
        type: String,
        required:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true
    },
    cardItems: {
        type: [cardItemSchema],
        required: true
    }
},{
    timestamps: true,
    collection: "Client"
})

module.exports = mongoose.model("Client", clientSchema)