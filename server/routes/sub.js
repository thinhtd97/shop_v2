const express = require('express');
const { create, list, read, update, remove } = require('../controllers/sub.js');
const { authCheck, adminCheck } = require('../middlewares/auth.js');

const router = express.Router();

router.post('/sub', authCheck, adminCheck, create);
router.get('/subs', list);
router.route('/sub/:slug').get(read).put(authCheck, adminCheck, update).delete(authCheck, adminCheck, remove)

module.exports = router;