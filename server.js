const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./database');

const app = express();
app.use(express.json()); // for parsing application/json

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function (err) {
        if (err) {
            return res.status(400).send("Username already exists.");
        }
        res.send("User created successfully.");
    });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ?', [username], async function (err, row) {
        if (err) {
            return res.status(400).send(err.message);
        }
        if (row) {
            const validPassword = await bcrypt.compare(password, row.password);
            if (validPassword) {
                res.send("Login successful!");
            } else {
                res.send("Invalid password.");
            }
        } else {
            res.send("User does not exist.");
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
