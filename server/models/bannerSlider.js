const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Name is required.",
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    image: {
        type: Object,
        required: true
    }
}, { timestamps: true })

const BannerSlider = mongoose.model('Banner', bannerSchema);
module.exports = BannerSlider;