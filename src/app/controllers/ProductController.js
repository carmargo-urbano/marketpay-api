const Product = require('../models/Products');

exports.index = async function (req, res) {
  const products = await Product.find();

  return res.json(products);
}

exports.store = async function (req, res) {
  const product = await Product.create(req.body);

  return res.json(product);
}

exports.delete = async function (req, res) {
  try {
    await Product.findByIdAndRemove(req.params.id);
    res.status(200).send({
        message: 'Produto removido com sucesso!'
    });
  } catch (e) {
      res.status(500).send({
          message: 'Falha ao remover o produto.'
      });
  }
}

exports.update = async function (req, res) {
  try {
    await Product.findByIdAndUpdate(req.params.id, {
      $set: req.body
    });
    res.status(200).send({
        message: 'Produto atualizado com sucesso!'
    });
  } catch (e) {
      res.status(500).send({
          message: 'Falha ao atualizar.'
      });
  }
}
