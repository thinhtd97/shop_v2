const admin = require('../firebase');
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
