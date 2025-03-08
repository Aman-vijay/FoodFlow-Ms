const mongoose = require('mongoose');
const { Schema } = mongoose;

const OptionSchema = new Schema({
  size: {
    type: String,
    enum: ['half', 'full'],
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, { _id: false });

const FoodItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'FoodCategory',
    required: true
  },
  img: {
    type: String,
    default: '',
    trim: true
  },
  options: {
    type: [OptionSchema],
    validate: v => Array.isArray(v) && v.length > 0
  },
  description: {
    type: String,
    default: '',
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('FoodItem', FoodItemSchema);
