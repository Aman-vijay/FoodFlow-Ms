const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

async function initData() {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log('Connected to MongoDB');

        const foodCollection = mongoose.connection.db.collection('food_items');
        const categoryCollection = await mongoose.connection.db.collection('foodCategory');
        // console.log('foodCollection:', foodCollection);



        const data = await foodCollection.find({}).toArray();
        const Catdata = await categoryCollection.find({}).toArray();

        // console.log('global.foodCategory:', Catdata);
        
        // return { data, Catdata };
        return { data, Catdata };
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        throw error;
    }
}

module.exports = initData;






