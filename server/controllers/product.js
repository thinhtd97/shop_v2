const Product = require('../models/product.js');
const asyncHandle = require('express-async-handler');
const slugify = require('slugify')

exports.create = asyncHandle(async (req, res) => {
   try {
        const { 
          name, 
          description, 
          price, 
          category, 
          subs, 
          quantity, 
          sold, 
          images, 
          shipping, 
          color, 
          brand } = req.body;
        const newProduct = new Product({
             name, 
             slug: slugify(name).toLowerCase(), 
             price, 
             description,
             category, 
             subs, 
             quantity, 
             sold, 
             images, 
             shipping, 
             color, 
             brand
          })
          const createProduct = await newProduct.save();

          res.json(createProduct);
   } catch (error) {
        console.log(error);
        res.status(400)
        throw new Error("Create Product Failed.");
   }
})
exports.list = asyncHandle(async (req, res) => {
     const products = await Product.find()
          .populate('category', '_id name')
          .populate('subs')
          .sort([['createdAt', 'desc']])
          .limit(parseInt(req.params.count));
     if(products) {
          return res.status(200).json(products);
     } else {
          res.status(400)
          throw new Error("Product not found.")
     }
})
