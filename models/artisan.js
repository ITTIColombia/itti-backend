const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artisanSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxLength: 50
    },
    cellphoneNumber: {
        type: String,
        required: true,
        minlength: 13,
        maxLength: 13
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
    shortDescription: {
        type: String,
        required: true,
        minlength: 10,
        maxLength: 250
    },
    detailedDescription: {
        type: String,
        required: true,
        minlength: 100,
        maxLength: 500
    },
    organizationSize: {
        type: Number,
        required: true,
        min: 1
    },
    url: {
        type: String,
        required: true,
        minlength: 10,
        maxLength: 250
    },
    logo:{
        type: String
    },
}, {
    collection: 'Artisan',
    timestamps: true
})

module.exports = mongoose.model("Artisan", artisanSchema);