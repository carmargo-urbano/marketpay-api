const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ClientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
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
        required: true,
        minLength: 3
    },
    roles: {
        type: String,
        required: true,
        enum: ['client', 'admin'],
        default: 'client'
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

ClientSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const client = this;
    if (client.isModified('password')) {
        client.password = await bcrypt.hash(client.password, 8);
    }
    next();
});

ClientSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the client
    const client = this;
    const token = jwt.sign({_id: client._id}, process.env.APP_SECRECT);
    client.tokens = client.tokens.concat({token});
    await client.save();
    return token;
};

ClientSchema.statics.findByCredentials = async (email, password) => {
    // Search for a client by email and password.
    const client = await Client.findOne({ email });
    if (!client) {
        throw new Error({ error: 'Invalid login credentials' })
    }

    const isPasswordMatch = await bcrypt.compare(password, client.password);
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return client
};

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;

