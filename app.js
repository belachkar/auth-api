'use strict';
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const dotenv = require('dotenv');
dotenv.config();

const { createUserTable, createUser, findUserByEmail } = require('./db/user');

// local variables
const port = process.env.SRV_PORT;
const host = process.env.SRV_HOST;

// Create Database object, db folder must be created
const db = new sqlite3.Database('./db/data.db');

// Creating the users table if not already created
createUserTable(db);

// Main server
const app = express();

// Parse data from request body
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// Routes
router.get('/', (req, res) => {
  res.status(200).send('<h1>This is an authentication server</h1>');
});

router.post('/register', (req, res) => {
  res.status(200).send({ access_token: '' });
});

router.post('/login', (req, res) => {
  res.status(200).send({ access_token: '' });
});

app.use(router);

// Start the server
app.listen(port, host, () => {
  console.log('Server listening at:', host+':'+port);
});
