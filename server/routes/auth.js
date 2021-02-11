const express = require('express');
const createOrUpdate = require('../controllers/auth.js');
const { authCheck } = require('../middlewares/auth.js');

const router = express.Router();

router.post('/createOrUpdate', authCheck, createOrUpdate)

module.exports = router;