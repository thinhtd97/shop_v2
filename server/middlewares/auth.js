const admin = require('../firebase');
const User = require('../models/user.js');
const asyncHandler = require('express-async-handler');

exports.authCheck = asyncHandler(async (req, res, next) => {
    try {
        if(req.headers.authtoken) {
            let firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken);
            req.user = firebaseUser;
            next();
        } else {
            res.status(404)
            throw new Error("Not authorized, no token");
        }
    } catch (error) {
        res.status(401)
        throw new Error("Invalid or expired token");
    }
})
exports.adminCheck = asyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const adminUser = await User.findOne({ email });
    if(adminUser.role !== "admin") {
        res.status(403)
        throw new Error("Admin resource. Access denied.");
    }
    next();
})
