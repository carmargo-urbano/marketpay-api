const express = require('express');
const router = express.Router();

const ProductController = require('./app/controllers/ProductController');
const ClientController = require('./app/controllers/ClientController');
const OrderController = require('./app/controllers/OrderController');
const StoreController = require('./app/controllers/StoreController');

const auth = require('./app/middlewares/auth');

router.get('/products', ProductController.index);
router.post('/products', ProductController.store);
router.get('/products/categories', ProductController.getCategories);
router.get('/products/:id', ProductController.getProduct);
router.delete('/products/:id', ProductController.delete);
router.put('/products/:id', ProductController.update);
router.get('/products/stock/:id', ProductController.getStock);

router.post('/users', ClientController.store);
router.post('/users/login', ClientController.login);
router.get('/users/me', auth, ClientController.getMe);
router.put('/users/me', auth, ClientController.updateMe);
router.post('/users/me/logout', auth, ClientController.logout);
router.post('/users/me/logoutall', auth, ClientController.logoutAll);

router.post('/orders', auth, OrderController.store);
router.post('/orders/filters', auth, OrderController.getAllOrders);
router.put('/orders/status/:id', auth, OrderController.updateStatus);
router.get('/orders/me', auth, OrderController.getByAuthUser);

router.get('/store', StoreController.index);
router.get('/store/:id', StoreController.getStore);
router.post('/store', StoreController.store);
router.put('/store/:id', StoreController.update);
router.delete('/store/:id', StoreController.delete);

module.exports = router;
