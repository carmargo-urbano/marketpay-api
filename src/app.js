require('dotenv/config');

const express = require('express');
const cors = require('cors');

const Sentry = require('@sentry/node');
const Youch = require('youch');

const routes = require('./routes');
const sentryConfig = require('./config/sentry');
require('express-async-errors');
require('./database');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
Sentry.init(sentryConfig);

// middlewares
app.use(Sentry.Handlers.requestHandler());
app.use(cors());
app.use(express.json());

// routes
app.use(routes);
app.use(Sentry.Handlers.errorHandler());

// error handling
app.use(async (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    const errors = await new Youch(err, req).toJSON();

    return res.status(500).json(errors);
  }

  return res.status(500).json({ error: 'Internal Server Error' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', routes);

module.exports = app;
