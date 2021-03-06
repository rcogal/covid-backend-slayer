const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    console.log('Connected to Mongodb');
  } catch (ex) {
    console.error(ex.message);
    process.exit(1);
  }
};

module.exports = connectDB;
