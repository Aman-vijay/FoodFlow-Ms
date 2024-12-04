const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');
const fetchDetails = require('../middleware/fetchdetails');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const mongoURI = process.env.MONGO_URI;





router.post('/foodData', async (req, res) => {
  
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log('Connected to MongoDB');

        const foodCollection = mongoose.connection.db.collection('food_items');
        const categoryCollection = mongoose.connection.db.collection('food_category');

        const data = await foodCollection.find({}).toArray();
        const Catdata = await categoryCollection.find({}).toArray();

        // console.log('global.foodCategory:', Catdata);
        
        // return { data, Catdata };
        res.json({ data,Catdata});
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        throw error;
    }
});

router.get('/getFoodItem', async (req, res) => {
    try {
        const foodItems = await FoodItem.find();
        res.json(foodItems);
        console.log('Food items sent!', foodItems);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
