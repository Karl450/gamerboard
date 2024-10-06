const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath1 = path.join(__dirname, 'classicwow.db');
const db1 = new sqlite3.Database(dbPath1, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

const dbPath2 = path.join(__dirname, 'dbd.db');
const db2 = new sqlite3.Database(dbPath2, (err) => {
  if (err) {
    console.error('Error opening anotherdb.db:', err.message);
  } else {
    console.log('Connected to anotherdb.db');
  }
});

module.exports = {
  db1,
  db2
};