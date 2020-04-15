const mongoose = require('mongoose');

const mongoConnection = mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
);

module.exports = mongoConnection;
