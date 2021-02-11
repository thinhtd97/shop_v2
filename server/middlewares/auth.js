const admin = require('../firebase');
const User = require('../models/user.js');
const asyncHandler = require('express-async-handler');

exports.authCheck = asyncHandler(async (req, res, next) => {
    try {
        let firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken);
        req.user = firebaseUser;
        next();
    } catch (error) {
        res.status(401).json({
            err: 'Invalid or expired token'
        })
    }
})
exports.adminCheck = asyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const adminUser = await User.findOne({ email });
    if(adminUser.role !== "admin") {
        return res.status(403).json({
            err: "Admin resource. Access denied."
        })
    }
    next();
})
