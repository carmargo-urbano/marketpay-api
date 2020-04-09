"use strict";const { Schema, model } = require('mongoose');

const ClientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        required: true,
        enum: ['client', 'admin'],
        default: 'client'
    }],
    active: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = model('Client', ClientSchema);
