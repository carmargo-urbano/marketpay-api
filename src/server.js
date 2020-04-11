const app = require('./app');

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

app.listen(port);
console.log(`API rodando na porta ${port}`);
