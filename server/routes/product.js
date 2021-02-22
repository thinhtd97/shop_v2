const express = require('express');
const { create, list, read, update, remove } = require('../controllers/product.js');
const { authCheck, adminCheck } = require('../middlewares/auth.js');

const router = express.Router();

// router.put('/product/update/:slug', authCheck, adminCheck, update);
router.post('/product', authCheck, adminCheck, create);
router.get('/products/:count', list);
// router.route('/product/:slug')
// .get(read)
// .delete(authCheck, adminCheck, remove);

module.exports = router;