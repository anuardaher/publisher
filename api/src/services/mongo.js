const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const uri = MONGO_URI

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  autoIndex: false,
  useUnifiedTopology: true 
};

try {
  mongoose.connect(uri, options);
} catch (error) {
  console.error(error);
}

mongoose.connection.on('error', err => {
  console.error(err);
});

mongoose.connection.on('connected', () => {
  console.log(`Database connected`);
});
