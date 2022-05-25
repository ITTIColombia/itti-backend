const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxLength: 50
    },
    capital: {
        type: String,
        required: true,
        minlength: 4,
        maxLength: 50
    },
    region: {
        type: String,
        required: true,
        minlength: 4,
        maxLength: 50
    },
    descriptionES: {
        type: String,
        required: true,
        minlength: 50,
        maxLength: 500
    },
    descriptionEN: {
        type: String,
        required: true,
        minlength: 50,
        maxLength: 500
    },
    mapColorRegion: {
        type: String,
        required: true
    }
}, {
    collection: 'Department',
    timestamps: true
})

module.exports = mongoose.model("Department", departmentSchema);