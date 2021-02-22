const cloudinary = require('cloudinary').v2;
const asyncHandle = require('express-async-handler');
const dotenv = require('dotenv');
dotenv.config();

//config
cloudinary.config({
    cloud_name: process.env.CLOUNDINARY_CLOUND_NAME,
    api_key: process.env.CLOUNDINARY_API_KEY,
    api_secret: process.env.CLOUNDINARY_API_SECRET
})

exports.upload = asyncHandle(async (req, res) => {
    try {
        let result = await cloudinary.uploader.upload(req.body.image, {
            public_id: `${Date.now()}`,
            resource_type: 'auto' // jpg, png
        });
        res.json({
            public_id: result.public_id,
            url: result.secure_url
        })
    } catch (error) {
        console.log(error);
    }
    
})
exports.remove = (req, res) => {
    let image_id = req.body.public_id;
    cloudinary.uploader.destroy(image_id, (err, result) => {
        if(err) return res.json({ success: false, err })
        res.send('ok');
    })
}