'use strict';
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const port = process.env.SRV_PORT;
const host = process.env.SRV_HOST;

// Parse data from request body
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// Routes
router.get('/', (req, res) => {
  res.status(200).send({ mesage: 'This is an authentication server' });
});

router.post('/register', (req, res) => {
  res.status(200).send({ access_token: '' });
});

router.post('/login', (req, res) => {
  res.status(200).send({ access_token: '' });
});

app.use(router);
app.listen(port, host, () => {
  console.log('Server listening at:', host+':'+port);
});
