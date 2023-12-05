

const express = require('express');
const app = express();
const port = 5001; // Choose a port for your UserService

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('UserService is running!');
});

app.use('/api/user', require('./src/routes/user'));

app.listen(port, () => {
    console.log(`UserService listening on http://localhost:${port}`);
});

// Connect to the database
require('./src/db')(function (err) {
    if (err) {
        console.error("Error connecting to the database:", err);
    } else {
        console.log("UserService connected to the database");
    }
});
