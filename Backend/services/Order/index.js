const express = require('express');
const app = express();
require("dotenv").config();
const port = process.env.PORT

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
    res.send('Shopping is running!');
});

app.use('/api/Order', require('./src/routes/Order'));

app.listen(port, () => {
    console.log(`Shopping listening on http://localhost:${port}`);
});

// Connect to the database
require('./src/db')(function (err) {
    if (err) {
        console.error("Error connecting to the database:", err);
    } else {
        console.log("Shopping connected to the database");
    }
});
