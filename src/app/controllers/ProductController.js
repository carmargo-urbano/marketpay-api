const Product = require('../models/Products');

exports.index = async function (req, res) {
  console.log('ProductsController index');
  const products = await Product.find();

  return res.json(products);
}

exports.store = async function (req, res) {
  const product = await Product.create(req.body);

  return res.json(product);
}

exports.delete = async function (req, res) {
  return res.json({
    message: 'Em contrucao'
  });
}

exports.update = async function (req, res) {
  return res.json({
    message: 'Em contrucao'
  });
}
