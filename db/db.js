const sqlite3 = require('sqlite3').verbose();
const assert = require('assert').strict;

const { createUserTable } = require('./user');

let _db;

function initDB(callback) {
  if (_db) {
    console.warn('Trying to init DB again!');
    return callback(null, _db);
  }

  // ! db folder must be created manualy
  const db = new sqlite3.Database('./db/data.db', connected);

  function connected(err) {
    if (err) {
      return callback(err);
    }
    console.log('DB initialized - connected to SQLite DB');
    _db = db;

    // Creating the users table if not already created.
    createUserTable(db);
    return callback(null, _db);
  }
}

function getDB() {
  assert.ok(_db, 'Db has not been initialized. Please called init first.');
  return _db;
}

module.exports = { getDB, initDB };
