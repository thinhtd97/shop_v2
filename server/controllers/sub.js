const Sub = require('../models/sub.js');
const asyncHandle = require('express-async-handler');
const slugify = require('slugify')

exports.create = asyncHandle(async (req, res) => {
    try {
        const { name, parent } = req.body;
        const sub = await new Sub({ name, parent, slug: slugify(name).toLowerCase() }).save();
        res.json(sub);
    } catch (error) {
        console.log(error);
        res.status(400)
        throw new Error("Create Sub Failed.")
    }
})
exports.list = asyncHandle(async (req, res) => {
    res.json(await Sub.find({}).sort({createdAt: -1}).populate('parent', '_id name slug'));
})
exports.read = asyncHandle(async (req, res) => {
    let sub = await Sub.findOne({ slug: req.params.slug }).populate('parent', '_id name slug');
    res.json(sub);
})
exports.update = asyncHandle(async (req, res) => {
    const { name, parent } = req.body;
    try {
        const updated = await Sub.findOneAndUpdate(
            { slug: req.params.slug }, 
            { name, slug: slugify(name), parent}, 
            { new: true });
        if(!updated) {
            res.status(400)
            throw new Error("Sub Update Failed.")
        }
        res.json(updated);
    } catch (error) {
        res.status(404)
        throw new Error(`${error}`)
    }
})
exports.remove = asyncHandle(async (req, res) => {
    try {
        const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
        res.json(deleted);
    } catch (error) {
        res.status(400)
        throw new Error("Sub Delete failed.")
    }
})