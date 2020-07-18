const express = require('express');
const connectDB = require('./config/database');
const { connect } = require('mongoose');
const app = express();

// Connect to database
connectDB();

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Initialize the middleware
app.use(express.json({ extended: false }));


// Define the api routes
app.use('/api/user', require('./routes/api/user'))
app.use('/api/login', require('./routes/api/authenticate'))

const PORT = process.env.PORT || 5000;

app.listen( PORT, () => {
  console.log(`Server started on port ${PORT}`)
});