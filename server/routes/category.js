const express = require('express');
const { create, list, read, update, remove } = require('../controllers/category.js');
const { authCheck, adminCheck } = require('../middlewares/auth.js');

const router = express.Router();

router.put('/category/update/:slug', authCheck, adminCheck, update);
router.post('/category', authCheck, adminCheck, create);
router.get('/categories', list);
router.route('/category/:slug')
.get(authCheck, adminCheck, read)
.delete(authCheck, adminCheck, remove);

module.exports = router;