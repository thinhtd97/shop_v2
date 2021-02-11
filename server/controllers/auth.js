const asyncHandler = require('express-async-handler');
const User = require('../models/user.js')

const createOrUpdate = asyncHandler(async (req, res) => {
    const { name, email, picture } = req.user;
    const user = await User.findOneAndUpdate({email}, {name, picture}, { new: true });
    if(user) {
        console.log("User updated", user);
        res.json(user);
    } else {
        const newUser = await new User({ name, email, picture }).save();
        console.log("User created", newUser);
        res.json(newUser)
    }
})

module.exports = createOrUpdate;