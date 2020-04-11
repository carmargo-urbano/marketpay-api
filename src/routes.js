const express = require('express');
const router = express.Router();

// import { Router } from 'express';

const ProductController = require('./app/controllers/ProductController');
const ClientController = require('./app/controllers/ClientController');
const OrderController = require('./app/controllers/OrderController');

const auth = require('./app/middlewares/auth');
// import UserController from './app/controllers/UserController';
// import SessionController from './app/controllers/SessionController';
// import ProviderController from './app/controllers/ProviderController';
// import AppointmentController from './app/controllers/AppointmentController';
// import ScheduleController from './app/controllers/ScheduleController';
// import NotificationController from './app/controllers/NotificationController';
// import AvailableController from './app/controllers/AvailableController';

// import authMiddleware from './app/middlewares/auth';

// const routes = new Router();

// Local middleware
// routes.post('/users', UserController.store);
// routes.put('/users', authMiddleware, UserController.update);
// routes.post('/sessions', SessionController.store);
// ---------------------------------------------------------------
// Global middleware
// Public Routes
router.post('/products', ProductController.store);
router.get('/products', ProductController.index);
router.delete('/products/:id', ProductController.delete);
router.put('/products/:id', ProductController.update);


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
// routes.post('/sessions', SessionController.store);


// Private Routes
// Todas as rotas que estiverem abaixo do middleware de autenticacao,
// passarao a requisitar a autenticacao
// routes.use(authMiddleware);
// routes.put('/users', UserController.update);

// routes.get('/providers', ProviderController.index);
// routes.get('/providers/:idProvider/available', AvailableController.index);

// routes.post('/appointments', AppointmentController.store);
// routes.get('/appointments', AppointmentController.index);
// routes.delete('/appointments/:id', AppointmentController.delete);

// routes.get('/schedule', ScheduleController.index);

// routes.get('/notifications', NotificationController.index);
// routes.put('/notifications/:id', NotificationController.update);

// export default routes;
module.exports = router;
