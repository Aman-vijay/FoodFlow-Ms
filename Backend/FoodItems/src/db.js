
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://Amanvj:Kakashi04@cluster0.nkvm0xm.mongodb.net/foodgomern?retryWrites=true&w=majority';

async function initData() {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log('Connected to MongoDB');

        const foodCollection = mongoose.connection.db.collection('food_items');
        const categoryCollection = mongoose.connection.db.collection('food_category');

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






