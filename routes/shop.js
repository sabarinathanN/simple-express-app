const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProductId);

router.get('/cart', shopController.getCart);

router.post('/cart',shopController.postCart);

router.post('/delete-cart-product',shopController.postCartDeleteProduct);

router.get('/checkout', shopController.getCheckout);

router.get('/order',shopController.getOrder);



module.exports = router;
