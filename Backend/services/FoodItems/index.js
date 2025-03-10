const dotenv = require('dotenv');
dotenv.config(); 


const express = require('express');
const {FRONTEND_URL} = require("./util")
const app = express();
const port = process.env.PORT || 5002;
const connectDB = require("./src/db")

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `${FRONTEND_URL}`);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());



// Routes
app.use('/api/fooditems', require('./src/routes/FoodItem'));

// Root route
app.get('/', (req, res) => {
  res.send('Food Items Service is running!');
});

(async () => {
  try {
    await connectDB();
    console.log('✅ Food Items connected to the database');

    app.listen(port, () => {
      console.log(`🚀 Food Items is live at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to the database, shutting down...');
    process.exit(1);
  }
})();
