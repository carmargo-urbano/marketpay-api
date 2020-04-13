const mongoose = require('mongoose');

const StoreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    cnpj: {
        type: String,
        required: true,
        trim: true
    },
    contactName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: false
    },
    whatsapp: {
        type: String,
        required: false
    },
    method: [{
        type: String,
        required: true,
        enum: ['take_away', 'delivery']
    }],
    active: {
        type: Boolean,
        required: true,
        default: true
    }
});

const Store = mongoose.model('Store', StoreSchema);

module.exports = Store;

