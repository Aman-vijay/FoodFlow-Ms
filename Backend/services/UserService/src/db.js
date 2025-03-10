const dotenv = require("dotenv").config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI

module.exports = async function connectDB() {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
     
    } catch (error) {
      console.error("❌ Error connecting to MongoDB:", error);
      throw error;
    }
  };