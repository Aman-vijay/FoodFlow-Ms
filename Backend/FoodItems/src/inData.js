// initData.js
const initData = require('./db');

async function initializeData() {
    try {
        
        const {  CatData } = await initData();
        // console.log(initData());
        // console.log(CatData);
        // global.foodData = data;
        global.foodCategory = CatData;

        // console.log('global.foodCategory:', global.foodCategory);
        // console.log('Food data:', data);
        // console.log('Category data:', CatData);
    } catch (error) {
        console.error('Error initializing data:', error.message);
    }
}

module.exports = initializeData;
