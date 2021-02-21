const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Name is required.",
        minLength: [3, 'Too short'],
        maxLength: [32, 'Too long']
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, { timestamps: true })

const Sub = mongoose.model("Sub", subSchema);
module.exports = Sub;