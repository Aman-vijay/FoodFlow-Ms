// Example FoodItem.js for FoodItemsService
const mongoose = require('mongoose');

const { Schema } = mongoose;

const FoodItemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    // Add other properties specific to a food item
});

module.exports = mongoose.model('foodItem', FoodItemSchema);
