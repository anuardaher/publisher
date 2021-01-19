const mongoose = require('mongoose');

const HOST = process.env.MONGO_HOST;
const PORT = process.env.MONGO_PORT;
const DATABASE = process.env.MONGO_DATABASE;

const USER = process.env.MONGO_USER;
const PASSWORD = process.env.MONGO_PASSWORD;

const uri = `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DATABASE}?retryWrites=true&w=majority`;

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
  console.log(`Database connected on ${HOST}:${PORT}/${DATABASE}`);
});
