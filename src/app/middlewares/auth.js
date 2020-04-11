const jwt = require('jsonwebtoken');
const Client = require('../models/Client');

const auth = async(req, res, next) => {
    const authorization = req.header('Authorization');
    if (!authorization) {
        res.status(401).send({ error: 'Not authorized to access this resource' });
    }

    const token = authorization.replace('Bearer ', '');
    const data = jwt.verify(token, process.env.APP_SECRECT);

    try {
        const client = await Client.findOne({ _id: data._id, 'tokens.token': token });
        if (!client) {
            throw new Error();
        }
        req.client = client;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' });
    }

}
module.exports = auth;

// import jwt from 'jsonwebtoken';
// import { promisify } from 'util';

// import authConfig from '../../config/auth';

// export default async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ error: 'Token not provided' });
//   }

//   const [, token] = authHeader.split(' ');

//   try {
//     const decode = await promisify(jwt.verify)(token, authConfig.secret);
//     req.userId = decode.id;

//     return next();
//   } catch (err) {
//     return res.status(401).json({ error: 'Invalid token' });
//   }
// };
