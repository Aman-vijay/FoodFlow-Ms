const mongoose = require('mongoose');
 require("dotenv").config();

const mongoURI = process.env.MONGO_URI

module.exports = async function connectDB() {
    try {
      await mongoose.connect(mongoURI);
     
    } catch (error) {
      console.error("❌ Error connecting to MongoDB:", error);
      throw error;
    }
  };