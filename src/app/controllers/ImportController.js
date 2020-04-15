const xlsx = require('node-xlsx').default;
const Product = require('../models/Products');

exports.importProducts = async function (req, res, next) {
  try {
    const workSheetsFromFile = xlsx.parse(`${__dirname}/../../import/${req.file.filename}`);

    let products = workSheetsFromFile.filter(file => file.name === 'Produtos');
    products = products[0].data.slice(1);

    for (const [idx, product] of products.entries()) {
      if (product[0] !== undefined || product[0] !== '') {
        const todo = await Product.create({
          brand: product[0],
          title: product[1],
          price: parseFloat(product[2].replace(",",".")),
          amount: product[3],
          category: product[4]
        });
      }
    }

    res.json({ message: 'Ok', products });
  } catch(e) {
    res.status(400).json({ message: e });
  }
};
