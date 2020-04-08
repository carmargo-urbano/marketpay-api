import Product from '../models/Products';

class ProductController {
  async index(req, res) {
    const products = await Product.find();

    return res.json(products);
  }

  async store(req, res) {
    const product = await Product.create(req.body);

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

export default new ProductController();
