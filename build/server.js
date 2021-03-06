"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('../src/app'); var _app2 = _interopRequireDefault(_app);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || '3000');

_app2.default.listen(port);
console.log(`API rodando na porta ${port}`);

// const http = require('http');
// const app = require('./app');

// function normalizePort(val) {
//   const port = parseInt(val, 10);

//   if (isNaN(port)) {
//     return val;
//   }

//   if (port >= 0) {
//     return port;
//   }

//   return false;
// }

// function onError(error) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }

//   const bind = typeof port === 'string'
//     ? `Pipe ${port}`
//     : `Port ${port}`;

//   switch (error.code) {
//     case 'EACCES':
//       console.error(`${bind} requires elevated privileges`);
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(`${bind} is already in use`);
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }

// function onListening() {
//   const addr = server.address();
//   const bind = typeof addr === 'string'
//     ? `pipe ${addr}`
//     : `port ${addr.port}`;
//   console.log(`Listening on ${bind}`);
// }

// const port = normalizePort(process.env.PORT || '3000');
// // app.set('port', port);

// const server = http.createServer(app);

// server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);
