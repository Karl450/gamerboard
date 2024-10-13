// view-data.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'dbd.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.all('SELECT * FROM wishlist', (err, rows) => {
        if (err) {
            console.error('Error querying data:', err.message);
        } else {
            console.log('Data in wishlist table:', rows);
        }
    });
});

// db.serialize(() => {
//     db.all('DROP TABLE IF EXISTS perks', (err, rows) => {
//         if (err) {
//             console.error('Error querying data:', err.message);
//         } else {
//             console.log('Data in connected_realms table:', rows);
//         }
//     });
// });

db.close();
