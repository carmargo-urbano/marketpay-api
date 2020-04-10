const mongoose = require('mongoose');

const mongoConnection = mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
);

module.exports = mongoConnection;
