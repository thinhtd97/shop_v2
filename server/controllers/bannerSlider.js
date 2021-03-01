const BannerSlider = require('../models/bannerSlider.js');
const asyncHandle = require('express-async-handler');
const slugify = require('slugify');

exports.create = asyncHandle(async (req, res) => {
    try {
        const { name, image } = req.body;
        const banner = new BannerSlider({
            name,
            slug: slugify(name),
            image
        })
        const bannerCreated = await banner.save();
        res.json(bannerCreated);
    } catch (error) {
        console.log(error);
        res.status(400)
        throw new Error("Create Banner Failed.")
    }
})
exports.list = asyncHandle(async (req, res) => {
    res.json(await BannerSlider.find({}).sort({createdAt: -1}));
})
exports.read = asyncHandle(async (req, res) => {
    let banner = await BannerSlider.findOne({ slug: req.params.slug });
    res.json(banner);
})
exports.update = asyncHandle(async (req, res) => {
    try {
        if(req.body.name) {
            req.body.slug = slugify(req.body.name);
       }
        const updated = await BannerSlider.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true })
                                            .exec();
        if(!updated) {
            res.status(400)
            throw new Error("Banner Update Failed.")
        }
        res.json(updated);
    } catch (error) {
        res.status(404)
        throw new Error(`${error}`)
    }
})
exports.remove = asyncHandle(async (req, res) => {
    try {
        const deleted = await BannerSlider.findOneAndDelete({ slug: req.params.slug });
        res.json(deleted);
    } catch (error) {
        res.status(400)
        throw new Error("Banner Delete failed.")
    }
})