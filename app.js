'use strict';
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const { initDB } = require('./db/db');

// local variables
const port = process.env.SRV_PORT;
const host = process.env.SRV_HOST;
const routes = {
  auth: require('./routes/auth')
};

// Create Database instance object
initDB((err) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
});

// Main server
const app = express();

// Parse data from request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Import routes
app.use(routes.auth);

// Start the server
app.listen(port, host, () => {
  console.log(`Server listening at: http://${host}:${port}`);
});
