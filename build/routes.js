"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _ProductController = require('./app/controllers/ProductController'); var _ProductController2 = _interopRequireDefault(_ProductController);
// import UserController from './app/controllers/UserController';
// import SessionController from './app/controllers/SessionController';
// import ProviderController from './app/controllers/ProviderController';
// import AppointmentController from './app/controllers/AppointmentController';
// import ScheduleController from './app/controllers/ScheduleController';
// import NotificationController from './app/controllers/NotificationController';
// import AvailableController from './app/controllers/AvailableController';

var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const routes = new (0, _express.Router)();

// Local middleware
// routes.post('/users', UserController.store);
// routes.put('/users', authMiddleware, UserController.update);
// routes.post('/sessions', SessionController.store);
// ---------------------------------------------------------------
// Global middleware
// Public Routes
routes.post('/products', _ProductController2.default.store);
routes.get('/products', _ProductController2.default.index);
routes.delete('/products/:id', _ProductController2.default.delete);
routes.put('/products/:id', _ProductController2.default.update);
// routes.post('/sessions', SessionController.store);


// Private Routes
// Todas as rotas que estiverem abaixo do middleware de autenticacao,
// passarao a requisitar a autenticacao
routes.use(_auth2.default);
// routes.put('/users', UserController.update);

// routes.get('/providers', ProviderController.index);
// routes.get('/providers/:idProvider/available', AvailableController.index);

// routes.post('/appointments', AppointmentController.store);
// routes.get('/appointments', AppointmentController.index);
// routes.delete('/appointments/:id', AppointmentController.delete);

// routes.get('/schedule', ScheduleController.index);

// routes.get('/notifications', NotificationController.index);
// routes.put('/notifications/:id', NotificationController.update);

exports. default = routes;
