const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'data.db'), (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to SQLite database');
        // Create a table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sessionKey TEXT NOT NULL,
            date TEXT NOT NULL,
            destination TEXT NOT NULL,
            phoneNumber VARCHAR(15),
            partySize INT DEFAULT 1,
            duration INT DEFAULT 1
        )`, (err) => {
            if (err) {
                console.error('Could not create table', err);
            }
        });
    }
});

module.exports = db;
