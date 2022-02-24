const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const enums = require("enums");

const orderItemSchema = new Schema({
    quantity: {
        type: Number,
        required: Number,
        min: 0
    }
})


const orderSchema = new Schema({
    price: {
        type: Number,
        required: true,
        min: 0
    },
    orderStatus:{
        type: String,
        required: true,
        enums: enums.orderStatus,
    },
    media: {
        type: [String],
        required: true,
    },
    orderItems: {
        type: [orderItemSchema],
        required: true
    }

}, {
    timestamps: true,
    collection: "Order"
})

module.exports = mongoose.model("Order", orderSchema)