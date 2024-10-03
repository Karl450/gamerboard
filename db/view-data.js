// view-data.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'classicwow.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.all('SELECT * FROM realms', (err, rows) => {
        if (err) {
            console.error('Error querying data:', err.message);
        } else {
            console.log('Data in connected_realms table:', rows);
        }
    });
});

db.close();
