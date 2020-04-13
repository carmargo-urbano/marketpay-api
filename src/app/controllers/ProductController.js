const Product = require('../models/Products');

exports.index = async function (req, res) {
  const products = await Product.find();

  res.json(products);
};

exports.store = async function (req, res) {
  const product = await Product.create(req.body);

  res.json(product);
};

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
};

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
};

exports.getStock = async function (req, res) {
  const productId = req.params.id;

  try {
    const stock = await Product.findById(productId, 'id amount');

    if (!stock.amount) {
      stock.amount = 0;
    }

    res.send(stock);
  } catch (error) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição',
      error
    });
  }
};

exports.getCategories = async function (req, res) {
  try {
    const categories = await Product.find({}, 'category').distinct('category');

    res.send(categories);
  } catch (error) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição',
      error
    });
  }
}
