"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Products = require('../models/Products'); var _Products2 = _interopRequireDefault(_Products);

class ProductController {
  async index(req, res) {
    console.log('ProductsController index');
    const products = await _Products2.default.find();

    return res.json(products);
  }

  async store(req, res) {
    const product = await _Products2.default.create(req.body);

    return res.json(product);
  }

  async delete(req, res) {
    return res.json({
      message: 'Em contrucao'
    });
  }

  async update(req, res) {
    return res.json({
      message: 'Em contrucao'
    });
  }
}

exports. default = new ProductController();
