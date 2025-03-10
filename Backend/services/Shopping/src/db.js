
const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://Amanvj:Kakashi04@cluster0.nkvm0xm.mongodb.net/foodgomern?retryWrites=true&w=majority'; // Replace with your actual MongoDB URI

module.exports = async function () {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

        // Additional setup or data retrieval can be performed here if needed
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};
