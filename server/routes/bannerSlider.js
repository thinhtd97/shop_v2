const express = require('express');
const { create, list, read, update, remove, getSubs } = require('../controllers/bannerSlider.js');
const { authCheck, adminCheck } = require('../middlewares/auth.js');

const router = express.Router();

router.post('/banner', authCheck, adminCheck, create);
router.get('/banner', list);
router.route('/banner/:slug')
.get(read)
.put(authCheck, adminCheck, update)
.delete(authCheck, adminCheck, remove);

module.exports = router;