const asyncHandler = require('express-async-handler');
const User = require('../models/user.js');

exports.createOrUpdate = asyncHandler(async (req, res) => {
    const { name, email, picture } = req.user;
    const user = await User.findOneAndUpdate({email}, {name, picture}, { new: true });
    if(user) {
        res.json(user);
    } else {
        const newUser = await new User({ name, email, picture }).save();
        res.json(newUser);
    }
});

exports.currentUser = asyncHandler((req, res) => {
    User.findOne({ email: req.user.email }).exec((err, user) => {
        if(err) throw new Error(err);
        res.json(user);
    })
});