const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  brand: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  discount: Number,
  amount: Number,
  offer: {
    type: Boolean,
    required: true,
    default: false
  },
  image: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

module.exports = model('Product', ProductSchema);
