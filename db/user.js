const createUserTable = (db) => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id integer PRIMARY KEY,
      name text,
      email text UNIQUE,
      password text
    )`;

  return db.run(query);
};

const findUserByEmail = (db, email, cb) => {
  const query = 'SELECT * FROM users WHERE email = ?';

  return db.get(query, [email], cb);
};

const createUser = (db, user, cb) => {
  const query = 'INSERT INTO users (name, email, password) VALUES (?,?,?)';

  return db.run(query, user, cb);
};

module.exports = { createUserTable, findUserByEmail, createUser };
