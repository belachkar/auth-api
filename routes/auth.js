const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { getDB } = require('../db/db');
const { createUser, findUserByEmail } = require('../db/user');

router.get('/', (req, res) => {
  return res.status(200).send('<h1>This is an authentication server</h1>');
});

router.post('/register', (req, res) => {
  const db = getDB();

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  createUser(db, [name, email, hashedPassword], (err) => {
    if (err) {
      console.error(err.message);
      if (err.message.indexOf('UNIQUE constraint failed') > 0)
        return res.status(500).send('Email already exists!');
      return res.status(500).send('Server error!');
    }
    findUserByEmail(db, email, (err, user) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Server error!');
      }
      const expiresIn = 60 * 60 * 24;
      const access_token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn });
      return res.status(200).send({ user, access_token });
    });
  });
});

router.post('/login', (req, res) => {
  const db = getDB();

  const email = req.body.email;
  const password = req.body.password;

  findUserByEmail(db, email, (err, user) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Server error!');
    }
    if (!user) {
      return res.status(404).send('User not found!');
    }
    console.log(password, user.password);
    const isPassValid = bcrypt.compareSync(password, user.password);
    if (!isPassValid) {
      return res.status(401).send('Password or email not valid!');
    }
    const expiresIn = 60 * 60 * 24;
    const access_token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn });
    return res.status(200).send({ user, access_token });
  });
});

module.exports = router;
