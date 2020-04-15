const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const OrderSchema = new Schema({
  number: {
    type: String,
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  items: [{
    amount: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
  }],
  status: {
    type: String,
    required: true,
    enum: ['waiting_approval', 'approved', 'in_progress', 'ready_to_pick', 'cancelled'],
    default: 'waiting_approval'
  },
  method: {
    type: String,
    required: true,
    enum: ['take_away', 'delivery'],
    default: 'take_away'
  },
  dateTimeToPick: {
    type: Date,
    required: true,
    default: Date.now
  },
  total: {
    type: Number,
    required: true
  },
  qrcodeRead: {
    type: String,
    required: true,
    default: false
  },
  complete: {
    type: String,
    required: true,
    default: false
  }
}, {
  timestamps: true
});

module.exports = model('Orders', OrderSchema);
