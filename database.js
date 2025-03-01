const sqlite3 = require('sqlite3').verbose();

// Connect to a database (it will create one if not exists)
let db = new sqlite3.Database('./userdb.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});

// Create users table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)`);

module.exports = db;
