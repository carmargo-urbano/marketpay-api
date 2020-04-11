const Order = require('../models/Orders');
// const guid = require('guid');

exports.getByAuthUser = async(req, res, next) => {
  try {
    const orders = await Order.find({
      client: req.client.id
    })
    .populate('client')
    .populate('items.product');
    res.status(201).send(orders);
  } catch (e) {
    res.status(500).send({
        message: 'Falha ao processar sua requisição'
    });
  }
};

exports.store = async(req, res, next) => {
  try {
    const order = await Order.create({
        client: req.client.id,
        // number: guid.raw().substring(0, 6),
        number: Math.ceil(Math.random(1, 100) * 100),
        items: req.body.items
    });
    res.status(201).send(order);
  } catch (e) {
    res.status(500).send({
        message: 'Falha ao processar sua requisição'
    });
  }
};

exports.getAllOrders = async(req, res, next) => {
  if (!req.client.roles.includes('admin')) {
    res.status(403).send({
      message: 'Access denied'
    });
  }

  const filters = req.body ? req.body : {};

  try {
    const orders = await Order.find(filters)
      .populate('client')
      .populate('items.product');
    res.status(201).send(orders);
  } catch (e) {
    res.status(500).send({
        message: 'Falha ao processar sua requisição'
    });
  }
};

exports.updateStatus = async(req, res, next) => {
  if (!req.body.status) {
    res.status(400).send({
      message: 'Missing status'
    });
  }

  const order = await Order.findById(req.params.id);
  if (order.status === 'waiting_approval' && req.body.status === 'cancelled' && req.client.roles.includes('client')) {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
      $set: {
        status: req.body.status
      }
    });
    res.status(200).send(updatedOrder);
  }

  // Only admin can update all status.
  if (!req.client.roles.includes('admin')) {
    res.status(403).send({
      message: 'Access denied'
    });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
      $set: {
        status: req.body.status
      }
    });
    res.status(200).send(updatedOrder);
  } catch(e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
};
