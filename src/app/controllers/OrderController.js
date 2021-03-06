const Order = require('../models/Orders');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

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
  // const dateTimeToPick = moment(req.body.dateTimeToPick);
  // const minDate = moment().add(1, 'd').hours(8).minutes(0).seconds(0);
  // const maxDate = moment().add(5, 'd').hours(22).minutes(0).seconds(0);

  // // Data minima para o pedido ficar pronto
  // if (moment(dateTimeToPick).isBefore(moment(minDate))) {
  //   res.status(400).send({
  //     message: 'Data menor que o limite'
  //   });
  // }

  // // Não pode escolher uma data maior que 5 dias
  // if (moment(dateTimeToPick).isAfter(moment(maxDate))) {
  //   res.status(400).send({
  //     message: 'Data maior que o limite'
  //   });
  // }

  // // Validar se a data escolhida é domingo
  // if (moment(dateTimeToPick).format('DDD') === 'Sun') {
  //   res.status(400).send({
  //     message: 'Dia da semana inválido'
  //   });
  // }

  try {
    const order = await Order.create({
      client: req.client.id,
      number: uuidv4(),
      // number: guid.raw().substring(0, 6),
      // number: Math.ceil(Math.random(1, 100) * 100),
      items: req.body.items,
      dateTimeToPick: req.body.dateTimeToPick,
      total: req.body.total
    });
    res.status(201).send(order);
  } catch (e) {
    res.status(500).send({
      error: e,
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

    res.status(200).send(orders);
  } catch (e) {
    res.status(500).send({
        message: 'Falha ao processar sua requisição'
    });
  }
};

exports.updateStatus = async(req, res) => {
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

exports.getByNumber = async(req, res) => {
  const order = await Order.find({
    number: req.params.number
  })
  .populate('client')
  .populate('items.product');

  if (!order) {
    res.status(400).send({ message: 'Pedido não encontrado' });
  }

  if (req.client.roles.includes('client') && order.client._id === req.client._id) {
    res.send(order);
  } else if (req.client.roles.includes('admin')) {

    if (req.query.qrcode) {
      await Order.findByIdAndUpdate(order._id, {
        $set: {
          qrcodeRead: true
        }
      });
    }

    res.send(order);
  } else {
    res.status(400).send({ message: 'Pedido não encontrado' });
  }
};

exports.getOrders = async(req, res, next) => {
  if (!req.client.roles.includes('admin')) {
    res.status(403).send({
      message: 'Access denied'
    });
  }

  let filters = req.query ? { ...req.query } : {};
  const availableFilters = [
    'status',
    'method',
    'number',
    'complete',
    'qrcodeRead',
  ];

  // Remove invalid filters
  Object.keys(filters).forEach(filter => {
    if (!availableFilters.includes(filter)) {
      delete filters[filter];
    }
  });

  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 10
  };

  const dateOptions = {
    startDate: req.query.startDate || moment().startOf('day').format('YYYY-MM-DD'),
    endDate: req.query.endDate || moment().endOf('day').format('YYYY-MM-DD')
  };

  if (!moment(dateOptions.startDate, 'YYYY-MM-DD', true).isValid() || !moment(dateOptions.endDate, 'YYYY-MM-DD', true).isValid()) {
    return res.status(400).send({
      message: 'Datas inválidas'
    });
  }

  if (moment(dateOptions.startDate).isAfter(moment(dateOptions.endDate))) {
    return res.status(400).send({
      message: 'Data de início não deve ser maior que data de fim'
    });
  }

  filters = {
    ...filters,
    dateTimeToPick: {
      $gte: new Date(dateOptions.startDate),
      $lte: new Date(dateOptions.endDate)
    }
  };

  try {
    const orders = await Order.find(filters)
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .populate('client')
      .populate('items.product');

    res.status(200).send(orders);
  } catch (e) {
    res.status(500).send({
        message: 'Falha ao processar sua requisição',
        error: e,
        filters
    });
  }
};
