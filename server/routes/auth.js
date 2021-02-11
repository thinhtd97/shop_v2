const express = require('express');
const { createOrUpdate, currentUser } = require('../controllers/auth.js');
const { authCheck, adminCheck } = require('../middlewares/auth.js');

const router = express.Router();

router.post('/createOrUpdate', authCheck, createOrUpdate);
router.post('/current-user', authCheck, currentUser);
router.post('/current-admin', authCheck, adminCheck, currentUser);

module.exports = router;