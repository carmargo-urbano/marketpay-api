const Store = require('../models/Stores');

exports.index = async function (req, res) {
  const stores = await Store.find();

  res.json(stores);
};

exports.getStore = async function (req, res) {
  try {
    const store = await Store.findById(req.params.id);

    res.json(store);
  } catch (error) {
    res.status(404).send({ message: 'Store not found' });
  }
};

exports.store = async function (req, res) {
  const store = await Store.create(req.body);

  res.json(store);
};

exports.delete = async function (req, res) {
  try {
    await Store.findByIdAndRemove(req.params.id);
    res.status(200).send({
        message: 'Loja removida com sucesso!'
    });
  } catch (e) {
      res.status(500).send({
          message: 'Falha ao remover a loja.'
      });
  }
};

exports.update = async function (req, res) {
  try {
    await Store.findByIdAndUpdate(req.params.id, {
      $set: req.body
    });
    res.status(200).send({
        message: 'Loja atualizada com sucesso!'
    });
  } catch (e) {
      res.status(500).send({
          message: 'Falha ao atualizar.'
      });
  }
};
