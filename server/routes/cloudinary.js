const express = require('express');
const router = express.Router();

// middleware
const { authCheck, adminCheck } = require('../middlewares/auth.js');
const { upload, remove } = require('../controllers/cloudinary.js');

router.post('/uploadimages', authCheck, adminCheck, upload);
router.post('/removeimage', authCheck, adminCheck, remove);

module.exports = router;