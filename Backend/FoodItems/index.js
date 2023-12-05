
const express = require('express');
const app = express();
const port = 5002;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json());

// Initialize data before starting the server
require('./src/inData')();

// Routes
app.use('/api/fooditems', require('./src/routes/FoodItem'));

app.get('/', (req, res) => {
    res.send('FoodItemsService is running!');
});

app.listen(port, () => {
    console.log(`FoodItemsService listening on http://localhost:${port}`);
});
