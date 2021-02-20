const Category = require('../models/category.js');
const asyncHandle = require('express-async-handler');
const slugify = require('slugify')

exports.create = asyncHandle(async (req, res) => {
    try {
        const { name } = req.body;
        const category = await new Category({ name, slug: slugify(name).toLowerCase() }).save()
        res.json(category);
    } catch (error) {
        res.status(400).send('Create Category Failed.')
    }
})
exports.list = asyncHandle(async (req, res) => {
    res.json(await Category.find({}).sort({createdAt: -1}));
})
exports.read = asyncHandle(async (req, res) => {
    let category = await Category.findOne({ slug: req.params.slug });
    res.json(category);
})
exports.update = asyncHandle(async (req, res) => {
    const { name } = req.body;
    try {
        const updated = await Category.findOneAndUpdate(
            { slug: req.params.slug }, 
            { name, slug: slugify(name)}, 
            { new: true });
        if(!updated) {
            return res.status(401).json({
                error: "Updated Failed."
            })
        }
        res.json(updated);
    } catch (error) {
        console.log(error);
    }
})
exports.remove = asyncHandle(async (req, res) => {
    try {
        const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
        res.json(deleted)
    } catch (error) {
        res.status(400).send('Deleted Failed.')
    }
})