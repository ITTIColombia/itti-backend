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
        ref: "Department",
        type: Schema.Types.ObjectId,
        required: true
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
    shortDescriptionES: {
        type: String,
        required: true,
        minlength: 10,
        maxLength: 250
    },
    detailedDescriptionES: {
        type: String,
        required: true,
        minlength: 100,
        maxLength: 500
    },
    shortDescriptionEN: {
        type: String,
        required: true,
        minlength: 10,
        maxLength: 250
    },
    detailedDescriptionEN: {
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
        minlength: 4,
        maxLength: 250
    },
    media: {
        video: {
            type: String,
            required:true,
        },
        technique: {
            type: [String],
            required: true,
        },
        logo: {
            type: String,
            required:true,
        },
        profile: {
            type: String,
            required:true,
        }
    }
}, {
    collection: 'Artisan',
    timestamps: true
})

module.exports = mongoose.model("Artisan", artisanSchema);