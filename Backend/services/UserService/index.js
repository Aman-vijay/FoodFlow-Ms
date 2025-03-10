require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const corsOptions = require('./src/config/corsOptions');
const connectDB = require('./src/db');
const userRoutes = require('./src/routes/user');

const app = express();
const port = process.env.PORT_USER || 5001;

// Middleware
// app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('UserService is running!');
});
app.use('/api/user', userRoutes);


(async () => {
  try {
    await connectDB();
    console.log('✅ UserService connected to the database');

    app.listen(port, () => {
      console.log(`🚀 UserService is live at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to the database, shutting down...');
    process.exit(1);
  }
})();
